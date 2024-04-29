import IconComponent from "../../components/genericIconComponent";
import { Button } from "../../components/ui/button";

import AddNewVariableButton from "../../components/addNewVariableButtonComponent/addNewVariableButton";
import ForwardedIconComponent from "../../components/genericIconComponent";
import TableComponent from "../../components/tableComponent";
import { useState } from "react";
import { ColDef, ColGroupDef } from "ag-grid-community";

export default function GlobalVariablesPage() {
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<(ColDef<any> | ColGroupDef<any>)[]>([
    { headerName: "Variable Name", field: "name", flex: 1 }, //This column will be twice as wide as the others
    {
      field: "type",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Prompt", "Credential"],
        valueListGap: 10,
      },
      flex: 1,
      editable: true,
    },
    {
      field: "value",
      cellEditor: "agLargeTextCellEditor",
      cellEditorPopup: true,
      flex: 2,
      editable: true,
    },
    {
      headerName: "Apply To Fields",
      field: "defaultFields",
      flex: 1,
      editable: true,
    },
  ]);

  const [rowData, setRowData] = useState([
    {
      name: "OpenAI Key",
      type: "Credential",
      value: "apijpioj09u302j0982ejf",
      defaultFields: "Open AI API Key",
    },
    {
      name: "Prompt",
      type: "Prompt",
      value: `Answer user's questions based on the document below:

    ---
    
    {Document}
    
    ---
    
    Question:
    {Question}
    
    Answer:
    `,
      defaultFields: ["Prompt"],
    },
    {
      name: "Azure Key",
      type: "Credential",
      value: "awowkdenvoaimojndofunoweoij0293u0n2e08n23",
      defaultFields: ["Azure API Key"],
    },
  ]);

  return (
    <div className="flex h-full w-full flex-col justify-between gap-6">
      <div className="flex w-full items-center justify-between gap-4 space-y-0.5">
        <div className="flex w-full flex-col">
          <h2 className="flex items-center text-lg font-semibold tracking-tight">
            Global Variables
            <ForwardedIconComponent
              name="Globe"
              className="ml-2 h-5 w-5 text-primary"
            />
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage and assign global variables to default fields. You can add
            new global variables by clicking the button.
          </p>
        </div>
        <div className="flex-shrink-0">
          <AddNewVariableButton>
            <Button data-testid="api-key-button-store" variant="primary">
              <IconComponent name="Plus" className="mr-2 w-4" />
              Add New
            </Button>
          </AddNewVariableButton>
        </div>
      </div>

      <div className="flex h-full w-full flex-col justify-between">
        <TableComponent columnDefs={colDefs} rowData={rowData} />
      </div>
    </div>
  );
}