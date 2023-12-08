"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DeleteProduct from "@/components/DeleteProduct";
import { User } from "@prisma/client";
import UpdateProduct from "@/components/UpdateProduct";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Loader2,
} from "lucide-react";
import {
  Column,
  useTable,
  Cell,
  Hooks,
  UseTableHooks,
  Row,
  useSortBy,
  SortingRule,
  SortByFn,
  TableSortByToggleProps,
  usePagination,
} from "react-table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RowActions from "@/components/rowsActionsForTable";
import ProductsFilter from "@/components/ProductsFilter";
import useDebounce from "@/hooks/useDebounce";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import DuplicateProduct from "@/components/DuplicateProduct";
import {
  useFilterProductsQuery,
  useSearchProductsQuery,
} from "@/redux/features/products/productSlice";
import { Product } from "@/lib/validators/newProduct";
import { Loader } from "lucide-react";

//export const dynamic = 'force-dynamic'    =  export const revalidate = 0
//export const dynamic = 'force-dynamic'
//export const revalidate = 0

type Props = {};

export default function ProductsList({}: Props) {
  const search = useSearchParams(); // get parametr from url to predefine search field state
  const searchQueryDefault = search ? (search.get("q") as string) : ""; // if parametr exist then get q parametr
  const [searchQuery, setSearchQuery] = useState<string>(searchQueryDefault); //default from url q parametr
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false); //default from url q parametr

  const [checked, setChecked] = useState(
    search && (search.get("global") as string) === "true" ? false : true
  );

  const defaultData = React.useMemo(() => [], []);
  const debauncedSearchTerm: string = useDebounce(searchQuery, 600);
  const [encodedSearchQuery, setEncodedSearchQuery] =
    useState<string>(debauncedSearchTerm);
  const router = useRouter();

  useEffect(() => {
    if (debauncedSearchTerm) {
      setEncodedSearchQuery(encodeURI(debauncedSearchTerm));
      router.push(
        `/products/productsList?q=${encodeURI(
          debauncedSearchTerm
        )}&global=${!checked}`
      );
    }
  }, [debauncedSearchTerm, checked, router]);

  const nameInput = useRef<HTMLInputElement>(null);

  console.log(debauncedSearchTerm);

  const { data: session } = useSession();

  //rtk query
  const {
    data: products,
    error,
    refetch,
    isError,
    isLoading,
    isFetching,
  } = useFilterProductsQuery({ q: encodedSearchQuery, global: !checked });

  const data: Product[] | undefined = React.useMemo(() => products, [products]);

  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: "Akcje",
        id: "actions", // 'id' is required
        Cell: ({ row }) => (
          //   <span >
          // { "👉"}
          //   </span>
          <span className="flex gap-2 justify-center">
            {session?.user.id === (row.original as Product).userId && (
              <>
                <UpdateProduct
                  product={row.original as Product}
                  queryparam={debauncedSearchTerm}
                />
                <DeleteProduct
                  product={row.original as Product}
                  queryparam={""}
                />
              </>
            )}
            {
              session?.user.id !== (row.original as Product).userId && (
                <DuplicateProduct product={row.original as Product} />
              ) /* {<DuplicateProduct product={row.original as Product }/>} */
            }
          </span>
        ),
      },
      {
        Header: "Produkt",
        accessor: "productName",
      },
      {
        Header: "Tłuszcz",
        accessor: "fat",
      },
      {
        Header: "Kcal",
        accessor: "kcal",
      },
      {
        Header: "Sztuka",
        accessor: "weightPiece",
      },
      {
        Header: "Garść",
        accessor: "weightHandful",
      },
      {
        Header: "Szklanka",
        accessor: "weightGlass",
      },
      {
        Header: "Łyżka",
        accessor: "weightSpoon",
      },
      {
        Header: "Łyżeczka",
        accessor: "weightSmallspoon",
      },
      {
        Header: "Twórca",
        accessor: "owner",
        Cell: ({ row }) => {
          return (
            <>
              {(row.original as any).user.image ? (
                <Image
                  className="rounded-full "
                  width={30}
                  height={30}
                  alt="sss"
                  src={(row.original as any).user.image as string}
                />
              ) : (
                <div className="bg-orange-600 rounded-full flex items-center justify-center w-[30px] h-[30px]">
                  <div>
                    {(row.original as any).user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </>
          );
        },
      },
    ],
    [debauncedSearchTerm, session?.user.id]
  );
  const displayedData = isLoading ? [] : data;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,

    state,
  } = useTable(
    {
      columns: columns,
      data: data || defaultData,
      initialState: { pageSize: 5 },
    },

    useSortBy, // need to have types from react-table-config.d.ts
    usePagination
    //tableHooks
  );

  const { pageIndex, pageSize } = state;

  //console.log("user image: " ,products?.length && (products[0] as any).user.image as string)
  return (
    <section className="">
      <div className="flex flex-col  justify-center  content-center ">
        <Link href="/products/newProduct" className=" ">
          <Plus className="w-8 h-8 text-green-600 mx-4" />
        </Link>
        <form
          className="flex      mx-4 mb-5 flex-col sm:flex-row   gap-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />{" "}
            <span> Tylko twoje produkty</span>{" "}
          </div>
          <input
            type="search"
            value={searchQuery || ""}
            ref={nameInput}
            onChange={(event) => {
              setLoadingSearch(true);
              const encodedSearchQuery = encodeURI(event.target.value);
              //router.push(`/products/productsList?q=${encodedSearchQuery}`);
              setSearchQuery(event.target.value);
              setLoadingSearch(false);
            }}
            className="px-5 py-1 md:w-5/6 md:px-5 w-full max-w-md  sm:py-3 flex-1  rounded-md  focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
            placeholder="Szukaj produktu"
          />
          {(isFetching || isLoading) && (
            <Loader className="my-auto w-10 h-10 animate-spin-slow   text-blue-800" />
          )}
        </form>

        <div className="flex flex-col px-8 ">
          <Table {...getTableProps()} className="min-h-[200px] ">
            <TableHeader>
              {headerGroups.map((headerGroup, i) => (
                <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, i) => (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={i}
                    >
                      <div className="flex  gap-2  items-center">
                        <span className="">{column.render("Header")}</span>
                        <span key={i}>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <ArrowDown />
                            ) : (
                              <ArrowUp />
                            )
                          ) : (
                            <ArrowUpDown className="opacity-10 w-4 h-4" />
                          )}
                        </span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()} key={i}>
                    {row.cells.map((cell, i) => {
                      return (
                        <TableCell {...cell.getCellProps()} key={i}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
          <div className="flex gap-6 flex-row-reverse pt-5">
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="disabled:opacity-20"
            >
              <ArrowRight />
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="disabled:opacity-20"
            >
              <ArrowLeft />
            </button>
            <select
              className="text-black"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Pokaż {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
