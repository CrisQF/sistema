import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TablePagination,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios, { AxiosResponse, AxiosError } from "axios";
import { styled } from "@mui/system";
import dayjs from "dayjs";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FFD700",
  color: "#000000",
  "&:hover": {
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
  minWidth: "150px",
  minHeight: "60px",
}));

const Puestos: React.FC = () => {
  const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rows, setRows] = useState<any[]>([]);
  const [editRow, setEditRow] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [newRow, setNewRow] = useState<any>({
    puesto: "",
    medida: "",
    material: "",
    clasificacion: "",
    fecha: "",
    inquilino: "",
    estatus: "ACTIVO",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(
        "http://localhost/mercadolasestrellas2/mercadolasestrellas2-backend/public/crud.php"
      )
      .then((response: AxiosResponse<any[]>) => {
        setRows(response.data);
      })
      .catch((error: AxiosError) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  const handleRecordsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecordsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset page number when changing rows per page
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEditClick = (row: any) => {
    setEditRow(row);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditRow(null);
  };

  const handleCloseNewModal = () => {
    setIsNewModalOpen(false);
    setNewRow({
      puesto: "",
      medida: "",
      material: "",
      clasificacion: "",
      fecha: "",
      inquilino: "",
      estatus: "ACTIVO",
    });
  };

  const handleSave = () => {
    if (editRow) {
      axios
        .put(
          "http://localhost/mercadolasestrellas2/mercadolasestrellas2-backend/public/crud.php",
          editRow
        )
        .then(() => {
          fetchData();
          handleCloseEditModal();
        })
        .catch((error: AxiosError) => {
          console.error("There was an error updating the data!", error);
        });
    }
  };

  const handleCreate = () => {
    axios
      .post(
        "http://localhost/mercadolasestrellas2/mercadolasestrellas2-backend/public/crud.php",
        newRow
      )
      .then(() => {
        fetchData();
        handleCloseNewModal();
      })
      .catch((error: AxiosError) => {
        console.error("There was an error creating the data!", error);
      });
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.id.toString().includes(searchTerm) ||
      row.puesto.includes(searchTerm) ||
      row.medida.includes(searchTerm) ||
      row.material.includes(searchTerm) ||
      row.clasificacion.includes(searchTerm) ||
      row.fecha.includes(searchTerm) ||
      row.inquilino.includes(searchTerm) ||
      row.estatus.includes(searchTerm)
    );
  });

  const displayedRows = filteredRows.slice(
    page * recordsPerPage,
    page * recordsPerPage + recordsPerPage
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        pt: 10,
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Typography variant="h4">MANTENIMIENTO PUESTOS</Typography>
        <Box>
          <Button
            variant="contained"
            color="error"
            startIcon={<AddIcon />}
            sx={{ mr: 2 }}
            onClick={() => setIsNewModalOpen(true)}
          >
            Nuevo Registro
          </Button>
          <CustomButton variant="contained" startIcon={<EditIcon />}>
            Relación de Puestos
          </CustomButton>
        </Box>
      </Box>
      <Box
        sx={{
          borderBottom: "2px solid #e0e0e0",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ mr: 1, fontWeight: "bold" }}>
            Mostrar
          </Typography>
          <FormControl sx={{ minWidth: 80 }}>
            <Select
              value={recordsPerPage.toString()}
              onChange={(event: SelectChangeEvent<string>) =>
                setRecordsPerPage(Number(event.target.value))
              }
              sx={{ height: 32, width: 80 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body1" sx={{ ml: 1, fontWeight: "bold" }}>
            registros
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ mr: 1, fontWeight: "bold" }}>
            Buscar:
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{ width: "300px", height: "32px" }}
            InputProps={{
              style: { height: "32px" },
            }}
          />
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#008000" }}>
              <TableCell sx={{ color: "#FFFFFF" }}>#</TableCell>
              <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                Nº Puesto
              </TableCell>
              <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                Medida
              </TableCell>
              <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                Material
              </TableCell>
              <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                Clasificación
              </TableCell>
              <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                Fecha Registro
              </TableCell>
              <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                Inquilino
              </TableCell>
              <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                Estatus
              </TableCell>
              <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                Acción
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.puesto}</TableCell>
                <TableCell align="right">{row.medida}</TableCell>
                <TableCell align="right">{row.material}</TableCell>
                <TableCell align="right">{row.clasificacion}</TableCell>
                <TableCell align="right">
                  {dayjs(row.fecha).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">{row.inquilino}</TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      backgroundColor:
                        row.estatus === "ACTIVO" ? "#008000" : "#FF0000",
                      color: "#FFFFFF",
                      borderRadius: "4px",
                      display: "inline-block",
                      padding: "0.25rem 0.5rem",
                    }}
                  >
                    {row.estatus}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#0000FF",
                      color: "#FFFFFF",
                      minWidth: "40px",
                      padding: "0.5rem",
                    }}
                    onClick={() => handleEditClick(row)}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={recordsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRecordsPerPageChange}
          labelRowsPerPage="Mostrar"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
        />
      </TableContainer>

      <Dialog
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#1976D2", color: "#FFFFFF" }}>
          MODIFICAR PUESTO
          <IconButton
            aria-label="close"
            onClick={handleCloseEditModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#FFFFFF",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
          >
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Nº Puesto (*)
              </Typography>
              <TextField
                margin="dense"
                placeholder="Ingresar Nº Puesto"
                type="text"
                fullWidth
                variant="outlined"
                value={editRow?.puesto || ""}
                onChange={(e) =>
                  setEditRow({ ...editRow, puesto: e.target.value })
                }
              />
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Medida (*)
              </Typography>
              <TextField
                margin="dense"
                placeholder="Ingresar Medida"
                type="text"
                fullWidth
                variant="outlined"
                value={editRow?.medida || ""}
                onChange={(e) =>
                  setEditRow({ ...editRow, medida: e.target.value })
                }
              />
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Material (*)
              </Typography>
              <FormControl fullWidth margin="dense">
                <Select
                  value={editRow?.material || ""}
                  onChange={(e) =>
                    setEditRow({ ...editRow, material: e.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="MATERIAL NOBLE">MATERIAL NOBLE</MenuItem>
                  <MenuItem value="MATERIAL OTRO">MATERIAL OTRO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Clasificación (*)
              </Typography>
              <FormControl fullWidth margin="dense">
                <Select
                  value={editRow?.clasificacion || ""}
                  onChange={(e) =>
                    setEditRow({ ...editRow, clasificacion: e.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="NO DIVIDIDO">NO DIVIDIDO</MenuItem>
                  <MenuItem value="DIVIDIDO">DIVIDIDO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Fecha Registro (*)
              </Typography>
              <TextField
                margin="dense"
                type="date"
                fullWidth
                variant="outlined"
                value={editRow?.fecha || ""}
                onChange={(e) =>
                  setEditRow({ ...editRow, fecha: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Estatus
              </Typography>
              <FormControl fullWidth margin="dense">
                <Select
                  value={editRow?.estatus || "ACTIVO"}
                  onChange={(e) =>
                    setEditRow({ ...editRow, estatus: e.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="ACTIVO">ACTIVO</MenuItem>
                  <MenuItem value="INACTIVO">INACTIVO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Inquilino (*)
              </Typography>
              <FormControl fullWidth margin="dense">
                <Select
                  value={editRow?.inquilino || ""}
                  onChange={(e) =>
                    setEditRow({ ...editRow, inquilino: e.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="ANA MARIA MENDIETA SOLIZ">
                    ANA MARIA MENDIETA SOLIZ
                  </MenuItem>
                  <MenuItem value="OTRO INQUILINO">OTRO INQUILINO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography
              variant="body2"
              color="error"
              sx={{ width: "100%", mt: 2, fontWeight: "bold" }}
            >
              Campos Obligatorios (*)
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEditModal}
            sx={{ backgroundColor: "#A9A9A9", color: "#FFFFFF" }}
            variant="contained"
          >
            Cerrar
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Modificar Puesto
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isNewModalOpen}
        onClose={handleCloseNewModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#1976D2", color: "#FFFFFF" }}>
          REGISTRAR PUESTO
          <IconButton
            aria-label="close"
            onClick={handleCloseNewModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#FFFFFF",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
          >
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Nº Puesto (*)
              </Typography>
              <TextField
                margin="dense"
                placeholder="Ingresar Nº Puesto"
                type="text"
                fullWidth
                variant="outlined"
                value={newRow.puesto}
                onChange={(e) =>
                  setNewRow({ ...newRow, puesto: e.target.value })
                }
              />
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Medida (*)
              </Typography>
              <TextField
                margin="dense"
                placeholder="Ingresar Medida"
                type="text"
                fullWidth
                variant="outlined"
                value={newRow.medida}
                onChange={(e) =>
                  setNewRow({ ...newRow, medida: e.target.value })
                }
              />
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Material (*)
              </Typography>
              <FormControl fullWidth margin="dense">
                <Select
                  value={newRow.material}
                  onChange={(e) =>
                    setNewRow({ ...newRow, material: e.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="MATERIAL NOBLE">MATERIAL NOBLE</MenuItem>
                  <MenuItem value="MATERIAL OTRO">MATERIAL OTRO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Clasificación (*)
              </Typography>
              <FormControl fullWidth margin="dense">
                <Select
                  value={newRow.clasificacion}
                  onChange={(e) =>
                    setNewRow({ ...newRow, clasificacion: e.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="NO DIVIDIDO">NO DIVIDIDO</MenuItem>
                  <MenuItem value="DIVIDIDO">DIVIDIDO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Fecha Registro (*)
              </Typography>
              <TextField
                margin="dense"
                type="date"
                fullWidth
                variant="outlined"
                value={newRow.fecha}
                onChange={(e) =>
                  setNewRow({ ...newRow, fecha: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Estatus
              </Typography>
              <FormControl fullWidth margin="dense">
                <Select
                  value={newRow.estatus}
                  onChange={(e) =>
                    setNewRow({ ...newRow, estatus: e.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="ACTIVO">ACTIVO</MenuItem>
                  <MenuItem value="INACTIVO">INACTIVO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                Inquilino (*)
              </Typography>
              <FormControl fullWidth margin="dense">
                <Select
                  value={newRow.inquilino}
                  onChange={(e) =>
                    setNewRow({ ...newRow, inquilino: e.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="ANA MARIA MENDIETA SOLIZ">
                    ANA MARIA MENDIETA SOLIZ
                  </MenuItem>
                  <MenuItem value="OTRO INQUILINO">OTRO INQUILINO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography
              variant="body2"
              color="error"
              sx={{ width: "100%", mt: 2, fontWeight: "bold" }}
            >
              Campos Obligatorios (*)
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseNewModal}
            sx={{ backgroundColor: "#A9A9A9", color: "#FFFFFF" }}
            variant="contained"
          >
            Cerrar
          </Button>
          <Button onClick={handleCreate} color="primary" variant="contained">
            Registrar Puesto
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Puestos;
