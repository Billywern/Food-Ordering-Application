import React, { useState } from 'react'
import { GetAvailableRestaurantData } from '../../services/restaurants'
import { AvailableOrderTableRow } from'./available-order-table-row'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  Paper
} from '@material-ui/core'

export const AvailableOrderTable = (props: AvailableOrderTableProps) => {
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
            <TableCell sortDirection='asc'>Restaurant Name</TableCell>
            <TableCell sortDirection='desc'>Status</TableCell>
            <TableCell/>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((restaurantDetail, index) => (
              <AvailableOrderTableRow 
                key={`availableOrderRow-${index}`}
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

interface AvailableOrderTableProps {
  data: GetAvailableRestaurantData[]
}
