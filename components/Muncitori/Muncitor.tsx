import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addSalariu,
  deleteSalariu,
  deleteWorker,
} from "../../store/projectSlice";
import { IMuncitor, ISalariu } from "../../types";
import { AddIcon, AmountBox, Button, DetailItem, DetailsBox } from "../UI";
import {
  MuncitorControl,
  MuncitorDelete,
  MuncitorIcon,
  MuncitorItem,
  MuncitorTitle,
  SalariiList,
  MuncitorName,
  MuncitorData,
  MuncitorTotal,
} from "./Muncitor.style";
import NewSalariu from "./NewSalariu";
import Salariu from "./Salariu";
import { formatAmount, totalSalaryByCurrency } from "../../utils";

const Muncitor = ({ name, id, salarii }: IMuncitor) => {
  const [isAdding, setIsAdding] = useState(false);
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  const deleteMuncitorHandler = (id: string) => {
    if (!confirm("Sigur doriți să ștergeți acest muncitor?")) return;
    dispatch(deleteWorker(id));
  };

  const deleteSalariuHandler = (workerID: string, salariuID: string) => {
    if (!confirm("Sigur doriți să ștergeți acest salariu?")) return;
    dispatch(deleteSalariu({ workerID, salariuID }));
  };

  const addSalariuHandler = (salaryData: Omit<ISalariu, "id">) => {
    const newSalariu: ISalariu = {
      ...salaryData,
      id: nanoid(6),
    };

    dispatch(addSalariu({ salariu: newSalariu, workerID: id }));
    cancelAdding();
  };

  const activateAdding = () => {
    setIsAdding(true);
    document.body.style.overflow = "hidden";
  };

  const cancelAdding = () => {
    setIsAdding(false);
    document.body.style.overflow = "";
  };

  const sortedSalaries = salarii
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const salariiList = sortedSalaries.map((salariu) => (
    <Salariu
      key={salariu.id}
      salariu={salariu}
      onDelete={() => deleteSalariuHandler(id, salariu.id)}
    />
  ));

  const totalEUR = totalSalaryByCurrency(salarii, "eur");
  const totalUSD = totalSalaryByCurrency(salarii, "usd");
  const totalMDL = totalSalaryByCurrency(salarii, "mdl");

  const workerDetails = (
    <DetailsBox insideSectionHeader>
      {totalEUR > 0 && (
        <DetailItem>
          <AmountBox type="used">€{formatAmount(totalEUR)}</AmountBox>
        </DetailItem>
      )}
      {totalUSD > 0 && (
        <DetailItem>
          <AmountBox type="used">${formatAmount(totalUSD)}</AmountBox>
        </DetailItem>
      )}
      {totalMDL > 0 && (
        <DetailItem>
          <AmountBox type="used">{formatAmount(totalMDL)} lei</AmountBox>
        </DetailItem>
      )}
    </DetailsBox>
  );

  return (
    <MuncitorItem editMode={editMode}>
      <MuncitorTitle>
        <MuncitorData>
          <MuncitorName>{name}</MuncitorName>
          {editMode && <MuncitorTotal>Total: {workerDetails}</MuncitorTotal>}
        </MuncitorData>
        <MuncitorControl>
          {/* {!editMode && workerDetails} */}
          {!editMode && workerDetails}
          {editMode && (
            <>
              <Button grayColor narrow small onClick={activateAdding}>
                <AddIcon />
              </Button>

              <Button small onClick={() => deleteMuncitorHandler(id)}>
                {/* <MuncitorDelete /> */}
                Șterge
              </Button>

              {/* <MuncitorIcon onClick={() => deleteMuncitorHandler(id)}>
                <MuncitorDelete />
              </MuncitorIcon> */}
            </>
          )}
        </MuncitorControl>
      </MuncitorTitle>

      {salariiList.length > 0 && <SalariiList>{salariiList}</SalariiList>}

      {isAdding && editMode && (
        <NewSalariu
          onSubmit={addSalariuHandler}
          onCancel={cancelAdding}
          hasSalarii={salarii.length > 0}
        />
      )}
    </MuncitorItem>
  );
};

export default Muncitor;
