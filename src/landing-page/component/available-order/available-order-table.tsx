import React, { useState } from 'react'
import { GetAvailableRestaurantData } from '../../../services/restaurants'
import { AvailableOrderTableRow } from'./available-order-table-row'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  Paper, TableRow
} from '@material-ui/core'

export const AvailableOrderTable = (props: AvailableOrderTableProps) => {
  /**
   * Description:
   * To show the list of available restaurants based on operation hours, off days
   * and also allow user to order food. This is where the table is set to show the data.
   */
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
              <TableCell>Status</TableCell>
              <TableCell/>
            </TableRow>
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
