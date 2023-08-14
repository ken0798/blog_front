import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

export function NoData() {
  return (
    <div className="not_found">
      <DoNotDisturbAltIcon
        sx={{ width: "150px", height: "150px" }}
        color="primary"
      />
      <p>No Data Found</p>
    </div>
  );
}
