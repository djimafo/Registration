import { useState } from "react";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { TableHead, colors } from "@mui/material";
import LensIcon from "@mui/icons-material/Lens";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { red } from "@mui/material/colors";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function AllAccounts() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      firstname: "jerry",
      lastname: "Malcaire",
      email: "jerrymalcaire@yahoo.fr",
      role: "admin",
      enable: false,
    },
    {
      id: 2,
      firstname: "jerry",
      lastname: "Malcaire",
      email: "jerrymalcaire@yahoo.fr",
      role: "admin",
      enable: false,
    },
    {
      id: 3,
      firstname: "jerry",
      lastname: "Malcaire",
      email: "jerrymalcaire@yahoo.fr",
      role: "manager",
      enable: false,
    },
    {
      id: 4,
      firstname: "jerry",
      lastname: "Malcaire",
      email: "jerrymalcaire@yahoo.fr",
      role: "user",
      enable: false,
    },
    {
      id: 5,
      firstname: "jerry",
      lastname: "Malcaire",
      email: "jerrymalcaire@yahoo.fr",
      role: "manager",
      enable: false,
    },
    {
      id: 6,
      firstname: "jerry",
      lastname: "Malcaire",
      email: "jerrymalcaire@yahoo.fr",
      role: "admin",
      enable: false,
    },
  ]);
  const rows = accounts;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box width="70%" m="0" p="0">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  width: 100,
                  backgroundColor: "#0a2e49",
                  color: "white",
                  fontSize: 14,
                }}
              >
                Firstname
              </TableCell>
              <TableCell
                style={{
                  width: 100,
                  backgroundColor: "#0a2e49",
                  color: "white",
                  fontSize: 14,
                }}
                align="left"
              >
                Lastname
              </TableCell>
              <TableCell
                style={{
                  width: 200,
                  backgroundColor: "#0a2e49",
                  color: "white",
                  fontSize: 14,
                }}
                align="left"
              >
                Email Adress
              </TableCell>
              <TableCell
                style={{
                  width: 20,
                  backgroundColor: "#0a2e49",
                  color: "white",
                  fontSize: 14,
                }}
                align="right"
              >
                Access Livel
              </TableCell>
              <TableCell
                style={{
                  width: 50,
                  backgroundColor: "#0a2e49",
                  color: "white",
                  fontSize: 14,
                }}
                align="right"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" style={{ width: 100 }}>
                  {row.firstname}
                </TableCell>
                <TableCell style={{ width: 100 }} align="left">
                  {row.lastname}
                </TableCell>
                <TableCell style={{ width: 200, maxWidth: 100 }} align="left">
                  {row.email}
                </TableCell>
                <TableCell style={{ width: 20 }} align="right">
                  <div
                    style={{
                      width: "50%",
                      margin:"0 auto",
                      padding:"3px",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "green[500]",
                      color:"white"
                    }}
                  >
                    {row.role === "admin" && <AdminPanelSettingsOutlinedIcon />}
                    {row.role === "manager" && <SecurityOutlinedIcon />}
                    {row.role === "user" && <LockOpenOutlinedIcon />}
                    <Typography  sx={{ ml: "2px" }}>
                      {row.role}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell style={{ width: 50 }} align="right">
                  <LensIcon style={{ color: "red" }}></LensIcon>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
