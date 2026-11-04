import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function AdminsTable({ data }) {
  return (
    <div>
      <div className="my-container p-4">
        <div className="w-full border-t-1 border-b-1">
          <div className="w-full rounded-md">
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow className="bg-primary">
                    <TableHead>Ім'я</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Роль</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.role}</TableCell>
                    </TableRow>
                
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}