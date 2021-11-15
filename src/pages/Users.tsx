import classes from "./Users.module.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState, useEffect } from "react";
import { UserStatus } from "../store/models";
import { ReactComponent as MoreIcon } from "../assets/dashboard/more-horizontal.svg";
import Moment from "moment";

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "שם מלא",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "אימייל",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues: any) => {
      return (
        <Link href={`mailto:${cellValues.row.email}`}>
          {cellValues.row.email}
        </Link>
      );
    },
  },
  {
    field: "linkedin",
    renderCell: (cellValues: any) => {
      return (
        <Link target="_blank" href={`${cellValues.row.linkedin}`}>
          {cellValues.row.linkedin}
        </Link>
      );
    },
    headerName: "פרופיל לינקדאין",
    type: "number",
    width: 270,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "dateSubscribed",
    headerName: "נרשם בתאריך",
    type: "number",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "category",
    headerName: "קטגוריה",
    type: "number",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    renderCell: (cellValues: any) => {
      return (
        <div
          className={classes.status}
          style={{
            background:
              cellValues.row.status === "פעיל" ? "#3CC73C25" : "#D92D2025",
            color: cellValues.row.status === "פעיל" ? "#3CC73C" : "#D92D20",
          }}
        >
          {cellValues.row.status}
        </div>
      );
    },
    headerName: "סטטוס",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "activity",
    renderCell: () => {
      return <MoreIcon />;
    },
    headerName: "פעילות",
    type: "number",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
];

function Users() {
  const users = useSelector((state: RootState) => state.dashboard.users);

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const newUsers = users?.map((m) => ({
      id: m.id,
      fullName: m.fullName,
      email: m.email,
      linkedin: m.linkedin,
      dateSubscribed: Moment(m.subscribedDate).format("L"),
      category: m.category,
      status: m.status === UserStatus.Active ? "פעיל" : "פעיל לא",
    }));

    setRows(newUsers);
  }, [users]);

  return (
    <div className={classes.root}>
      <h2>מאגר רשומים</h2>
      <div className={classes.dataGrid}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}

export default Users;