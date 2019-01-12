import React from "react";
import dateFns from "date-fns";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import { Dot } from "./Dot";

export function FreelanceForm({ freelances }) {
  return (
    <div style={{ padding: "20px 50px" }}>
      {freelances.map(freelance => (
        <ExpansionPanel key={freelance.uid}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Dot color={freelance.disponible ? "green" : "red"} />
                <Typography style={{ marginLeft: "10px" }}>{`${freelance.name} ${freelance.lastname}`}</Typography>
                <Typography style={{ marginLeft: "3px" }}>
                  {`${
                    freelance.disponible
                      ? "est disponible depuis le " + dateFns.format(freelance.dateModifDispo, "D MMMM YYYY")
                      : "travail chez " + freelance.societe
                  }`}
                </Typography>
              </div>
              <div>
                {freelance.techno &&
                  freelance.techno.split(",").map(tech => <Chip style={{ marginLeft: "10px" }} label={tech} />)}
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <p>nom: {freelance.lastname}</p>
              <p>societe : {freelance.societe}</p>
              <p>techno : {freelance.techno}</p>
              <p>email : {freelance.email}</p>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}
