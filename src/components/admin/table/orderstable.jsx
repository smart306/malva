import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function OrdersTable({data, users, products}){
    return(
        <div>
            <div className="my-container p-4">
                <div className="w-full border-t-1 border-b-1">
            <div className="w-full rounded-md">
              <Table className="w-full table-auto">
                <TableHeader>
                  <TableRow className="bg-primary">
                    <TableHead>Дата</TableHead>
                    <TableHead>Продукти</TableHead>
                    <TableHead>Загальна ціна</TableHead>
                    <TableHead>Користувач</TableHead>
                    <TableHead>Ім'я</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Дочтавка</TableHead>
                    <TableHead>Адреса</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => {
                    const userId =
                      typeof item.user === "object"
                        ? item.user?._id
                        : item.user;
                    const matchedUser = users.find(
                      (u) => String(u._id) === String(userId),
                    );
                    return (
                      <TableRow key={item._id}>
                        <TableCell>
                          {item.date
                            ? new Date(item.date).toLocaleDateString()
                            : ""}
                        </TableCell>
                        <TableCell>
                          {item.products?.map((it) => {
                            const productId =
                              typeof it.product === "object"
                                ? it.product?._id
                                : it.product;
                            const matchedProduct = products.find(
                              (p) => String(p._id) === String(productId),
                            );
                          
                            return (
                              <div key={matchedProduct?._id} className="w-full">
                                <div className="w-full flex justify-between space-x-1 border-b-1 break-words whitespace-normal ">
                                  <p className=" pr-1 font-medium break-all flex-1 min-w-0">
                                    {matchedProduct?.title || "Товар видалено"}
                                  </p>
                                  <p className="border-r px-1 whitespace-nowrap shrink-0">
                                    {matchedProduct?.price || "Товар видалено"}$
                                  </p>
                                  <p className="pl-1 whitespace-nowrap shrink-0">
                                    x{it.quantity}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </TableCell>
                        <TableCell>{item.totalPrice}</TableCell>
                        <TableCell>{matchedUser.name || "N/A"}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.dostavka}</TableCell>
                        <TableCell className="text-right">
                          {item.address || ""}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              </div>
              </div>
            </div>
        </div>
    )
}