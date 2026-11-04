import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function DostavkasTable({ data }) {
  return (
    <div>
          <div className="my-container p-4">
            <div className="w-full border-t-1 border-b-1">
              <div className="w-full rounded-md">
                <Table className="w-full table-auto">
                  <TableHeader>
                    <TableRow className="bg-primary">
                      <TableHead>Ім'я</TableHead>
                      <TableHead>Час</TableHead>
                      <TableHead>Ціна</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="relative"><Image src={item.time} fill className="object-contain"/></TableCell>
                        <TableCell>{item.price}</TableCell>
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