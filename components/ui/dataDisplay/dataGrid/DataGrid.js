// app/components/ui/dataDisplay/DataGrid/DataGrid.js
import { Table, Pagination, Loading } from "@/components/ui";

export const DataGrid = ({
  columns,
  data,
  loading,
  pageCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="data-grid-container">
      {loading ? (
        <Loading className="h-64" />
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};
