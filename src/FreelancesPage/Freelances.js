import React from "react";
import dateFns from "date-fns";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import { Dot } from "./Dot";
import { Box, Flex } from "rebass";

export function Freelances({ freelances }) {
  return (
    <Box p={["10px 10px", "20px 50px"]}>
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
                  freelance.techno
                    .split(",")
                    .map(tech => <Chip style={{ marginLeft: "10px", marginBottom: "5px" }} label={tech} />)}
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Flex flexDirection={["column", "row"]}>
              <Flex flexDirection={"column"} mx="30px">
                <Typography>Nom: {freelance.lastname}</Typography>
                <Typography>Societe : {freelance.societe}</Typography>
                <Typography>Techno : {freelance.techno}</Typography>
              </Flex>
              <Flex flexDirection="column" mx="30px">
                <Typography>Email : {freelance.email}</Typography>
                <Typography>Expérience: </Typography>
                <Typography>TJM: </Typography>
              </Flex>
            </Flex>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Box>
  );
}
