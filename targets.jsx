import { useState } from "react"; import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button";

const targets = { practice: Array.from({ length: 5 }, (, i) => ({ id: xxxx-xxxx-${i + 1}, feedback: { text: "A simple natural scene with water and trees.", images: ["https://via.placeholder.com/400"] } })), assorted: Array.from({ length: 5 }, (, i) => ({ id: xxxx-xxxx-${i + 6}, feedback: { text: "An unusual or abstract concept target.", images: ["https://via.placeholder.com/400"] } })) };

function Home() { return ( <div className="p-8"> <h1 className="text-3xl font-bold mb-6">Remote Viewing Targets</h1> <div className="space-y-4"> <Link to="/practice"> <Button className="w-full">Practice Targets</Button> </Link> <Link to="/assorted"> <Button className="w-full">Assorted Targets</Button> </Link> </div> </div> ); }

function TargetList({ type }) { const list = targets[type]; return ( <div className="p-8"> <h2 className="text-2xl font-semibold mb-4 capitalize">{type} Targets</h2> <div className="space-y-2"> {list.map((t, index) => ( <Card key={t.id}> <CardContent className="p-4 flex justify-between items-center"> <span>{index + 1}. {t.id}</span> <Link to={/target/${t.id}}> <Button>View</Button> </Link> </CardContent> </Card> ))} </div> </div> ); }

function TargetPage() { const { id } = useParams(); const [revealed, setRevealed] = useState(false);

const allTargets = [...targets.practice, ...targets.assorted]; const target = allTargets.find(t => t.id === id);

if (!target) { return <div className="p-8">Target not found</div>; }

return ( <div className="p-8"> <h2 className="text-2xl font-bold mb-4">Target ID: {id}</h2>

{!revealed ? (
    <Button onClick={() => setRevealed(true)}>Reveal Feedback</Button>
  ) : (
    <div className="mt-4 space-y-4">
      {target.feedback.text && (
        <p className="text-lg">{target.feedback.text}</p>
      )}
      {target.feedback.images.map((img, i) => (
        <img key={i} src={img} alt="feedback" className="rounded-2xl shadow" />
      ))}
    </div>
  )}
</div>

); }

export default function App() { return ( <Router> <Routes> <Route path="/" element={<Home />} /> <Route path="/practice" element={<TargetList type="practice" />} /> <Route path="/assorted" element={<TargetList type="assorted" />} /> <Route path="/target/:id" element={<TargetPage />} /> </Routes> </Router> ); }

