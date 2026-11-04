import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function ProductsTable({ data }) {
  return (
    <div>
      <div className="my-container">
        <div className="w-fit flex flex-col justify-center gap-4">
          <div className="w-full overflow-x-auto rounded-md border">
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow className="bg-primary">
                  <TableHead>Категорія</TableHead>
                  <TableHead>Назва</TableHead>
                  <TableHead>Ціна</TableHead>
                  <TableHead>Рейтинг</TableHead>
                  <TableHead>Бренд</TableHead>
                  <TableHead>Підкатегорія</TableHead>
                  <TableHead>Кольори</TableHead>
                  <TableHead className="text-right">Кількість</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="break-words whitespace-normal">
                      {item.maincategory}
                    </TableCell>
                    <TableCell className="break-words whitespace-normal">
                      {item.title}
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.rating}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.subcategories?.type}</TableCell>
                    <TableCell>
                      {item.colors.map((it) => (
                        <span key={String(it._id)}>{it.color}</span>
                      ))}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
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
