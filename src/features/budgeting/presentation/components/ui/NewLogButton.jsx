import { Fab } from "@mui/material";
import { Link } from "react-router-dom";

export default function NewLogButton() {
    return (
        // <Link to="/budget-logs/new">
        //     <Button type="contained" color="primary">
        //     {/* <button role="link"> */}
        //         {/* TODO: Replace with + icon */}
        //         + New entry
        //     {/* </Button> */}

        //     </Button>
        // </Link>

        // <Button 
        //     to="/budget-logs/new" 
        //     component={Link} 
        //     size="large" 
        //     variant="contained"
        //     fullWidth
        // >+ New Entry</Button>

        <Fab role="link" to="/budget-logs/new" component={Link} sx={{ position: 'fixed', right: 40, bottom: 80 }} variant="extended" color="primary">+ New Entry</Fab>
    );
}