//React imports
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

//Component imports
import { StudentTableHeader } from './StudentTableHeader';
import { getComparator } from '../../utils';

//MUI imports
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TablePagination, Container, Switch, TextField } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('forename');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterText, setFilterText] = useState('');

  // Fetches the list of students from a JSON file on initial render
  useEffect(() => {
    fetch('/students.json')
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);

  // Resets the page to 0 whenever the filter text changes
  useEffect(() => {
    setPage(0);
  }, [filterText]);

  /**
   * Handles sorting when a column header is clicked.
   * @param {Event} event - The event that triggered the sorting.
   * @param {string} property - The property by which the list is sorted.
  */
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  /**
   * Handles the pagination change when the user clicks to a new page.
   * @param {Event} event - The event that triggered the page change.
   * @param {number} newPage - The new page number.
  */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Handles the change in number of rows per page.
   * @param {Event} event - The event containing the new number of rows to display per page.
  */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * Updates the filter text state, used to filter students by forename or surname.
   * @param {Event} event - The event that triggered the filter text change.
  */
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  /**
   * Filters students based on the filter text (forename or surname).
   * @returns {Array} - The filtered list of students.
  */
  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.forename.toLowerCase().includes(filterText.toLowerCase()) ||
      student.surname.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [students, filterText]);

  /**
   * Returns a list of students for the current page after sorting and filtering.
   * @returns {Array} - The sorted and paginated list of students.
  */
  const visibleRows = useMemo(
    () =>
      [...filteredStudents]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredStudents]
  );

  /**
   * Toggles the 'send' boolean for a student, used to handle SEND status.
   * @param {number} id - The id of the student to toggle SEND status for.
  */
  const handleToggleSend = (id) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id
          ? { ...student, send: !student.send }
          : student
      )
    );
  };

  /**
   * Calculates the number of empty rows to display for padding in the table.
   * @returns {number} - The number of empty rows.
  */
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredStudents.length) : 0;

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Toolbar>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
              Students
              </Typography>
            <TextField
              variant="outlined"
              label="Filter"
              value={filterText}
              onChange={handleFilterChange}
            />
          </Toolbar>
          <TableContainer id="table-container">
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
              <StudentTableHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={filteredStudents.length}
              />
              <TableBody>
                {visibleRows.map((student, index) => {
                  const labelId = `enhanced-table-row-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={student.id}
                    >
                      <TableCell align="left">{student.id}</TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            src={student.imageUrl}
                            alt={student.forename}
                            style={{ width: '40px', height: '40px', marginRight: '10px', borderRadius: '50%' }}
                          />
                          <Link to={`/student/${student.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {student.forename} {student.surname}
                          </Link>
                        </Box>
                      </TableCell>
                      <TableCell align="left">{student.form}</TableCell>
                      <TableCell align="left" onClick={() => handleToggleSend(student.id)} style={{fontWeight: 'bold', color: student.send ? 'green' : 'red',  cursor: 'pointer'}}>
                        {student.send ? 'Yes' : 'No'}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredStudents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Container>
  );
}
