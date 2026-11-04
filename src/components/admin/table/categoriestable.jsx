import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function CategoriesTable({ data }) {
  return (
    <div>
      <div className="my-container p-4">
        <div className="w-full border-t-1 border-b-1">
          <div className="w-full rounded-md">
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow className="bg-primary">
                  <TableHead>Ім'я</TableHead>
                  <TableHead>Фото</TableHead>
                  <TableHead>Підкатегорії</TableHead>
                  <TableHead>Посилання</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.maincategory}</TableCell>
                    <TableCell className="relative"><Image src={item.image} fill className="object-contain"/></TableCell>
                    <TableCell>{item.subcategories.map((it) => (
                        <div key={it}>
                            <p>{it}</p>
                        </div>
                    ))}</TableCell>
                    <TableCell>{item.slug}</TableCell>
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