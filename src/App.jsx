import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Layout = ({ children }) => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <header className="flex justify-between py-4 border-b border-zinc-800 text-sm">
      <h1 className="font-semibold tracking-tight">NOESIS</h1>
      <nav className="flex gap-4">
        <Link to="/">Главная</Link>
        <Link to="/library">Библиотека</Link>
        <Link to="/quests">Квесты</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/community">Сообщество</Link>
      </nav>
    </header>
    <main className="mt-6">{children}</main>
  </div>
);

const Home = () => (
  <div className="text-center space-y-4">
    <h2 className="text-3xl font-semibold">Будь лучше вчерашнего себя</h2>
    <p className="text-zinc-400 text-sm max-w-lg mx-auto">
      Платформа для подростков, которые хотят развивать мышление,
      предпринимательские навыки и осознанность.
    </p>
  </div>
);

const Library = () => <h2 className="text-lg font-semibold">Материалы появятся скоро</h2>;
const Quests = () => <h2 className="text-lg font-semibold">Квесты в разработке</h2>;
const Profile = () => <h2 className="text-lg font-semibold">Твой профиль</h2>;
const Community = () => <h2 className="text-lg font-semibold">Сообщество учащихся</h2>;

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
