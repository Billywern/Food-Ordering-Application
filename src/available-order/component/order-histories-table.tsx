import React, { useState } from 'react'
import { GetPastOrdersData } from '../../services/restaurants'
import { OrderHistoriesTableRow } from './order-histories-table-row'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  Paper, TableRow
} from '@material-ui/core'

export const OrderHistoriesTable = (props: OrderHistoriesTableProps) => {
  const { data } = props
  const rowsPerPage = 10
  const [ page, setPage ] = useState(0)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  }
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Restaurant Name</TableCell>
              <TableCell>Food</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Ordered Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((restaurantDetail, index) => (
              <OrderHistoriesTableRow 
                key={`order-histories-${index}`}
                data={restaurantDetail}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10]}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </React.Fragment>
  )
}

interface OrderHistoriesTableProps {
  data: GetPastOrdersData[]
}
