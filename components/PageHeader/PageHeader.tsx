import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MdEdit, MdCheck, MdAdd } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { RiSettings3Fill } from "react-icons/ri";
import { Button, Input, Spinner } from "../UI";

import { setProjectName } from "../../store/projectSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { nanoid } from "@reduxjs/toolkit";
import { updateProject, EMPTY_PROJECT } from "../../utils";
import { ClientView, IProject } from "../../types";
import { Header, Title, TitleForm, TitleIcon } from "./PageHeader.style";
import { setEditMode } from "../../store/adminSlice";
import { createPortal } from "react-dom";
import SettingsModal from "./SettingsModal";

interface IProps {
  children: string;
  role: "add" | "edit";
  isAdmin: boolean;
  hasHomeBtn?: boolean;
  hasWorkersBtn?: boolean;
}

const PageHeader = ({
  children,
  role,
  isAdmin,
  hasHomeBtn,
  hasWorkersBtn,
}: IProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [settingsModalActive, setSettingsModalActive] = useState(false);
  const editMode = useAppSelector((state) => state.admin.editMode);

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isEditing) inputRef.current!.focus();
  }, [isEditing]);

  useEffect(() => {
    if (count === 5 && isAdmin) dispatch(setEditMode(true));
  }, [count, dispatch, isAdmin]);

  const editHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newName = inputRef.current!.value;
    if (newName) dispatch(setProjectName(newName));
    setIsEditing(false);
  };

  const addHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProjectName = inputRef.current!.value;

    if (!newProjectName) {
      setIsEditing(false);
      return;
    }
    setIsLoading(true);

    const newProject = { ...EMPTY_PROJECT } as IProject;
    newProject.name = newProjectName;
    const newProjectID = nanoid(10);
    const newProjectInfo = {
      id: newProjectID,
      name: newProjectName,
    };

    await updateProject(newProjectID, newProject, newProjectInfo);
    router.push(`/${newProjectID}`);
  };

  const openSettings = () => {
    setSettingsModalActive(true);
    document.body.style.overflow = "hidden";
  };

  const closeSettings = () => {
    setSettingsModalActive(false);
    document.body.style.overflow = "";
  };

  const workersPageBtn = <Button onClick={() => router.push("/workers")}>Muncitori</Button>;

  if (!editMode)
    return (
      <Header>
        {hasHomeBtn && isAdmin && (
          <TitleIcon onClick={() => router.push("/")}>
            <IoArrowBack />
          </TitleIcon>
        )}
        <Title onClick={() => setCount((prev) => prev + 1)}>{children}</Title>
        {hasWorkersBtn && workersPageBtn}
      </Header>
    );

  return (
    <Header>
      {hasHomeBtn && (
        <TitleIcon onClick={() => router.push("/")}>
          <IoArrowBack />
        </TitleIcon>
      )}
      {!isEditing && (
        <>
          <Title>{children}</Title>
          {hasWorkersBtn && workersPageBtn}
          {role === "add" && (
            <Button
              removeMargin
              small
              narrow
              onClick={() => setIsEditing(true)}>
              <TitleIcon>
                <MdAdd />
              </TitleIcon>
            </Button>
          )}
          {role === "edit" && (
            <Button removeMargin small narrow onClick={openSettings}>
              <TitleIcon>
                <RiSettings3Fill />
              </TitleIcon>
            </Button>
          )}
        </>
      )}
      {isEditing && (
        <TitleForm onSubmit={role === "edit" ? editHandler : addHandler}>
          <Input
            type="text"
            defaultValue={role === "edit" ? children : ""}
            ref={inputRef}
            placeholder="Numele proiectului..."
          />
          <Button removeMargin small narrow type="submit">
            {!isLoading ? (
              <TitleIcon>
                <MdCheck />
              </TitleIcon>
            ) : (
              <Spinner small />
            )}
          </Button>
        </TitleForm>
      )}
      {settingsModalActive && <SettingsModal onClose={closeSettings} />}
    </Header>
  );
};

export default PageHeader;
