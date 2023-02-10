import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
} from '@tanstack/react-table'
import { makeData, Person } from './util/makeData'
import { Card, CardBody, Table, Thead, Tbody, Tr, Th, Td, chakra, Button, Select, Input, Flex, Spacer, Box } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'


function TablePagePagination() {
  const rerender = React.useReducer(() => ({}), {})[1]

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: props => props.column.id,
      },
    ],
    []
  )

  const [data, setData] = React.useState(() => makeData(100000))
  const refreshData = () => setData(() => makeData(100000))

  return (
    <>
    <Card m="3">
      <CardBody>
        <TableData
          {...{
            data,
            columns,
          }}
        />
        {/* <hr />
        <div>
          <Button onClick={() => rerender()}>Force Rerender</Button>
        </div>
        <div>
          <Button onClick={() => refreshData()}>Refresh Data</Button>
        </div> */}
      </CardBody>
    </Card>
      
    </>
  )
}

function TableData({
  data,
  columns,
}: {
  data: Person[]
  columns: ColumnDef<Person>[]
}) {
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  })

  return (
    <Box p="2">
      <Flex
        minWidth="max-content"
        justifyContent="flex-end"
        gap="2"
        mb="2%"
      >
        <span>Show : </span>
        <Select
          w="170px"
          size="sm"
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Select>
        <span>Rows</span>
        {/* {table.getRowModel().rows.length} Rows */}
      </Flex>
      <Table>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              <Th>#</Th>
              {headerGroup.headers.map(header => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row, index) => {
            return (
              <Tr key={row.id}>
                <Td key={index}>{index + 1}</Td>
                {row.getVisibleCells().map(cell => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <Flex minWidth="max-content"
            justifyContent="center"
            gap="2"
            mt="2%">
        <Flex gap="2">
          <span>Go to page : </span>
          <Input
            size="sm"
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }} width="60px"/>
        </Flex>
        <Spacer />
        <Flex gap="2">
          <Button
            leftIcon={<ArrowLeftIcon />}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            size="sm"
            colorScheme="teal"
            width="60px"
          />
          <Button
            leftIcon={<ChevronLeftIcon />}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            size="sm"
            colorScheme="teal"
            width="60px"
          />
          <Flex gap="2" ml="15px" mr="15px">
            <span>Page : </span>
            <strong> {table.getState().pagination.pageIndex + 1} </strong>
              of{' '}
            <strong> {table.getPageCount()} </strong>
          </Flex>
          <Button
            rightIcon={<ChevronRightIcon />}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            size="sm"
            colorScheme="teal"
            width="60px"
          />
          <Button
            rightIcon={<ArrowRightIcon />}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            size="sm"
            colorScheme="teal"
            width="60px"
          />
        </Flex>
      </Flex>
      {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </Box>
  )
}
function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: ReactTable<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <Flex gap="2">
      <Input
        variant='flushed'
        mt="8px"
        size="xs"
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
      />
      <Input
        variant='flushed'
        mt="8px"
        size="xs"
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
      />
    </Flex>
  ) : (
    <Input
      variant='flushed'
      mt="8px"
      size="xs"
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
    />
  )
}

// const rootElement = document.getElementById('root')
// if (!rootElement) throw new Error('Failed to find the root element')

// ReactDOM.createRoot(rootElement).render(
//   <React.StrictMode>
//     <TablePagePagination />
//   </React.StrictMode>
// )


export default TablePagePagination;