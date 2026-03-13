import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function Reviews({data}){
    return (
      <section className="bg-secondary p-4">
        <div className="w-full text-center">
          <h1 className="text-primary font-primary h1">Відгуки</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4">
          {data.reviews.map((item) => (
            <div key={item.id} className="bg-primary rounded-2xl p-2">
              <div className="p-2 flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/Ellipse2.svg" />
                </Avatar>
                <h2 className="font-secondary">{item.name}</h2>
              </div>
              <div className="bg-secondary rounded-2xl p-2">
                <p className="text-primary font-secondary">{item.review}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-center items-center">
          <Button className="py-2 px-4 rounded-full text-2xl">Більше відгуків</Button>
          <Button className="py-2 px-4 rounded-full text-2xl">Написати відгук</Button>
        </div>
      </section>
    );
}