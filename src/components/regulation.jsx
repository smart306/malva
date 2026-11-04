import MarkDown from "./markdown";

export default function RegulationP({data}){
  const formattedDate = data.date 
    ? new Date(data.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
    return (
      <div className="lg:mt-30">
        <div className="my-container">
          <h1>{data.name}</h1>
          <h2>{formattedDate}</h2>
          <MarkDown>{data.markdownContent}</MarkDown>
        </div>
      </div>
    );
}