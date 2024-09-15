"use client";
import { useFetch } from "@/hook/useFetch";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

interface TodoData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Todos = () => {
  const { data, loading, error } = useFetch<TodoData[]>(
    "https://jsonplaceholder.typicode.com/todos",
    "GET"
  );
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 30;
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'notCompleted'>('all');

  const filteredData = data?.filter(todo => {
    if (statusFilter === 'completed') return todo.completed;
    if (statusFilter === 'notCompleted') return !todo.completed;
    return true; 
  }) || [];

  const columns: ColumnDef<TodoData>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "completed",
      header: "Status",
      cell: ({ getValue }) => {
        const completed = getValue() as boolean;
        return (
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              completed ? "bg-green-500" : "bg-red-500"
            }`}
            disabled
          >
            {completed ? "Completed" : "Not Completed"}
          </button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredData || [],
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="data-table p-4">
        <div className="flex items-center justify-end mb-4">
        <label htmlFor="statusFilter" className="mr-2 text-gray-800 dark:text-gray-200">
          Filter by status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'completed' | 'notCompleted')}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>
      <table className="w-full border-collapse bg-white dark:bg-gray-800">
        <thead className="bg-gray-100 dark:bg-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b dark:border-gray-600">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 text-left text-gray-800 dark:text-gray-200"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
      </table>
      <div className="table-actions mt-6 flex justify-end items-center space-x-4 p-4">
        <button
          type="button"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={!table.getCanPreviousPage()}
          className="p-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
        >
          <BiArrowToLeft />
        </button>
        <span className="text-gray-800 dark:text-gray-200">
          Page {pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          type="button"
          onClick={() => setPageIndex((prev) => Math.min(prev + 1, table.getPageCount() - 1))}
          disabled={!table.getCanNextPage()}
          className="p-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
        >
          <BiArrowToRight />
        </button>
      </div>
    </div>
  );
};

export default Todos;
