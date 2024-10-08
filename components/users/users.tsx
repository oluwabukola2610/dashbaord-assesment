/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useFetch } from "@/hook/useFetch";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import UserModal from "./UserModal";

export type UserData = Record<string, any>;

const UsersPage = () => {
  const { data, loading, error } = useFetch<UserData[]>(
    "https://jsonplaceholder.typicode.com/users",
    "GET"
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<{ id: string; desc: boolean } | null>(
    null
  );
  const pageSize = 5;
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnDef<UserData>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: false,
      },
      {
        accessorKey: "address.city",
        header: "City",
        enableSorting: false,
      },
      {
        accessorKey: "company.name",
        header: "Company",
        enableSorting: false,
      },
      {
        accessorKey: "id",
        header: "Details",
        enableSorting: false,
        cell: ({ row }) => (
          <button
            onClick={() => {
              setSelectedUser(row.original);
              setIsModalOpen(true);
            }}
            className="btn"
          >
            View
          </button>
        ),
      },
    ],
    []
  );

  const sortedData = useMemo(() => {
    if (!data) return [];
    const sorted = [...data];
    if (sorting?.id === "name") {
      sorted.sort((a, b) => {
        const aValue = a.name;
        const bValue = b.name;

        return sorting.desc
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      });
    }
    return sorted;
  }, [data, sorting]);

  const filteredData = useMemo(() => {
    return sortedData.filter((user) =>
      user.name.toLowerCase().includes(globalFilter.toLowerCase())
    );
  }, [sortedData, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;

      setPageIndex(newState.pageIndex);
    },
  });

  const handleSort = (columnId: string) => {
    if (columnId === "name") {
      setSorting((prev) => ({
        id: columnId,
        desc: prev?.id === columnId ? !prev.desc : false,
      }));
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className=" p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none"
        />
      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border-collapse bg-white dark:bg-gray-800 rounded-md">
          <thead className="bg-gray-100 dark:bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b dark:border-gray-600"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`p-3 text-left text-gray-800 dark:text-gray-200 ${
                      header.id === "name" ? "cursor-pointer" : ""
                    }`}
                    onClick={() =>
                      header.id === "name" && handleSort(header.id)
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {sorting?.id === header.id
                      ? sorting.desc
                        ? " 🔽"
                        : " 🔼"
                      : header.id === "name"
                      ? " ⇅"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {loading ? (
            <>
              <span className="loading loading-dots loading-xs dark:text-white"></span>
              <span className="loading loading-dots loading-sm dark:text-white"></span>
              <span className="loading loading-dots loading-md dark:text-white"></span>
              <span className="loading loading-dots loading-lg dark:text-white"></span>
            </>
          ) : (
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-3 text-gray-700 dark:text-gray-300"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-700 dark:text-gray-300"
                  >
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      <div className="table-actions mt-6 flex justify-end items-center space-x-4 p-4">
        <button
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
        >
          <BiArrowToLeft />
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
        >
          <BiArrowToRight />
        </button>
      </div>
      <dialog className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {isModalOpen && (
        <UserModal user={selectedUser} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default UsersPage;
