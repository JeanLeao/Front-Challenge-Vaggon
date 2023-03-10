import { useEffect, useState } from "react";
import styles from "./RegisterActivies.module.css";
import { ButtonNew } from "../Components/Button/ButtonComponent";
import axios from "axios";
import { axiosConfig } from "../CalendarPage/CalendarPage";
import Select from "react-select";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

export const UpdatesActivies = (props) => {
  const [title, setTitle] = useState(props?.title ?? "");
  const [description, setDescription] = useState(props?.description ?? "");

  const [update, setUpdate] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState("");
  const options = [
    { value: "open", label: "ABERTO" },
    { value: "pendent", label: "PENDENTE" },
    { value: "cancelado", label: "FECHADO" },
  ];
  useEffect(() => {
    console.log(localStorage.getItem("slug"));
    console.log(localStorage.getItem("title"));
    if (localStorage.getItem("token")) {
      axios
        .get(
          "http://localhost:3500/activities/" +
            localStorage.getItem("slug") +
            "/" +
            localStorage.getItem("title"),
          axiosConfig
        )
        .then((data) => {
          localStorage.setItem("id", data.data.id);
        })
        .catch((error) => {
          console.log(error);
          localStorage.clear();
          window.location.href = "/";
        });
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
  }, []);

  function registerNewActivies() {
    const data1 = {
      name: title,
      description: description,
    };
    axios
      .patch(
        "http://localhost:3500/activity/" + localStorage.getItem("id"),
        data1,
        axiosConfig
      )
      .then((data) => {
        alert(data.data.message);
        window.location.href = "/user";
      });
  }

  function deleteEvent() {
    axios
      .delete(
        "http://localhost:3500/activity/" + localStorage.getItem("id"),
        axiosConfig
      )
      .then((data) => {
        alert(data.data.message);
        window.location.href = "/user";
      });
  }

  function alternativePendency() {
    setUpdate(true);
  }

  function AlternateStatus() {
    console.log(statusUpdate);
    setUpdate(false);
    axios
      .post(
        "http://localhost:3500/activitype/" + localStorage.getItem("id"),
        { newstatus: statusUpdate },
        axiosConfig
      )
      .then((data) => {
        alert(data.data.message);
        window.location.href = "/user";
      });
  }

  return (
    <>
      {update ? (
        <div
          style={{ position: "absolute", zIndex: "3", top: "30%", left: "40%" }}
        >
          <div className={styles.floatDivUpdate}>
            <h1 className={styles.titlefloatDiv}>teste</h1>

            <Select
              onChange={(e) => {
                setStatusUpdate(e.value);
              }}
              options={options}
            />

            <button
              className={styles.buttonSelection}
              onClick={() => {
                AlternateStatus();
              }}
            >
              Selecionar
            </button>
          </div>
        </div>
      ) : null}
      <div className={styles.container}>
        <div style={{ display: "flex" }}></div>
        <h3 style={{ color: "#ffffff" }}>Update Activies</h3>
        <Box
          gap={2}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Titulo"
            InputLabelProps={{
              style: {
                color: "#ffffff",
              },
            }}
            sx={{
              input: {
                color: "#ffffff",
              },
            }}
            variant="outlined"
            color="success"
            id="title"
            focused={title !== ""}
            value={title !== "" ? title : props.title}
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <TextField
            multiline
            label="Description"
            InputProps={{
              style: {
                color: "#ffffff",
              },
            }}
            InputLabelProps={{
              style: {
                color: "#ffffff",
              },
            }}
            variant="outlined"
            color="success"
            id="description"
            focused={description !== ""}
            value={description !== "" ? description : props.description}
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <ButtonNew
            value="Submit"
            onClick={() => {
              registerNewActivies();
            }}
          />
        </Box>
      </div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <button
          className={styles.delbutton}
          onClick={() => {
            deleteEvent();
          }}
        >
          Deletar
        </button>
        <button
          className={styles.attbutton}
          onClick={() => {
            alternativePendency();
          }}
        >
          Atualizar Status
        </button>
      </Box>
    </>
  );
};
