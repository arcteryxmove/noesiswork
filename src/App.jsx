import { useState, useEffect } from "react";

const quotes = [
  { text: "Самый большой риск — не рисковать.", author: "Марк Цукерберг" },
  {
    text: "Ваше время ограничено, не тратьте его, живя чужой жизнью.",
    author: "Стив Джобс",
  },
  {
    text: "Если вы не построите свою мечту, кто-то наймёт вас строить свою.",
    author: "Тони Гаскинс",
  },
];

const baseMaterials = [
  {
    id: "m1",
    title: "Мой первый проект за 14 дней",
    description:
      "Пошаговая структура, как довести идею до первых действий и понять, работает ли она.",
    topic: "Предпринимательство",
    topicKey: "business",
    hasArticle: true,
    durationLabel: "10–14 мин",
    typeLabel: "article",
    reward: 15,
    articleContent: [
      "Предпринимательство — это не про статус и не про громкие слова. Это навык замечать проблемы вокруг и превращать их в понятные решения.",
      "Твой первый проект не обязан быть огромным. Достаточно маленького эксперимента: выбрать конкретного человека, его проблему и предложить простое улучшение.",
      "Важно не ждать идеальной идеи. Важно как можно быстрее выйти из головы в реальность: поговорить с людьми, показать прототип, собрать обратную связь.",
      "Через такие маленькие циклы действий ты начинаешь мыслить как предприниматель: видеть возможности, а не только ограничения.",
    ],
  },
  {
    id: "m2",
    title: "Мышление создателя",
    description:
      "Как смотреть на мир как на конструктор возможностей, а не как на набор ограничений.",
    topic: "Мышление",
    topicKey: "mindset",
    hasArticle: false,
    durationLabel: "8 мин",
    typeLabel: "video",
    reward: 10,
  },
  {
    id: "m3",
    title: "Психология ответственности",
    description:
      "Взрослая позиция: перестать перекладывать и начать управлять собой и решениями.",
    topic: "Психология",
    topicKey: "psychology",
    hasArticle: false,
    durationLabel: "9 мин",
    typeLabel: "article",
    reward: 10,
  },
  {
    id: "m4",
    title: "Деньги и базовые финансы",
    description:
      "Что такое доход, расход, активы, пассивы и почему это важнее, чем оценки в дневнике.",
    topic: "Деньги",
    topicKey: "money",
    hasArticle: false,
    durationLabel: "11 мин",
    typeLabel: "article",
    reward: 15,
  },
];

const questsData = [
  {
    id: "q1",
    title: "Придумай 5 идей проектов",
    description:
      "Зафиксируй идеи и выбери одну, которую хочешь проверить на реальных людях.",
    reward: 10,
  },
  {
    id: "q2",
    title: "Найди 3 реальные проблемы вокруг",
    description:
      "Школа, друзья, семья, город — выпиши, что тебя раздражает и что можно улучшить.",
    reward: 10,
  },
  {
    id: "q3",
    title: "Поговори с человеком о его проблеме",
    description:
      "Выбери одну проблему и расспроси человека глубже: что его бесит, что он уже пробовал, почему это важно.",
    reward: 15,
  },
  {
    id: "q4",
    title: "Собери мини-гипотезу проекта",
    description:
      "Сформулируй: кто твой человек, какая у него проблема и как ты можешь её упростить маленьким решением.",
    reward: 20,
  },
];

const questQuizzes = {
  q1: {
    id: "qq1",
    title: "Квест 1: идеи проектов",
    topicLabel: "Квест",
    questions: [
      {
        id: 1,
        text: "Для чего нужно придумывать сразу несколько идей, а не одну?",
        options: [
          "Чтобы казаться умнее",
          "Чтобы было что рассказать друзьям",
          "Чтобы сравнить варианты и не влюбляться в первую идею",
          "Чтобы учитель поставил оценку",
        ],
        correctIndex: 2,
      },
      {
        id: 2,
        text: "Хорошая идея для первого проекта — это…",
        options: [
          "То, что требует миллионов и команды",
          "То, что можно протестировать за 7–14 дней",
          "То, что понравится всем в мире",
          "То, что уже делают крупные компании",
        ],
        correctIndex: 1,
      },
    ],
  },
  q2: {
    id: "qq2",
    title: "Квест 2: реальные проблемы",
    topicLabel: "Квест",
    questions: [
      {
        id: 1,
        text: "Где проще всего искать идеи для проектов?",
        options: [
          "В статьях про стартапы",
          "В фантазиях",
          "В реальных проблемах людей вокруг",
          "В школьных учебниках",
        ],
        correctIndex: 2,
      },
      {
        id: 2,
        text: "Что важно записать про проблему?",
        options: [
          "Кто её испытывает и в каких ситуациях",
          "Любой рандомный факт",
          "Только своё мнение",
          "Ничего, достаточно заголовка",
        ],
        correctIndex: 0,
      },
    ],
  },
  q3: {
    id: "qq3",
    title: "Квест 3: интервью",
    topicLabel: "Квест",
    questions: [
      {
        id: 1,
        text: "Главная задача разговора с человеком про его проблему — это…",
        options: [
          "Убедить его в своей идее",
          "Показать, какой ты умный",
          "Понять, как он сам описывает боль и что уже пробовал",
          "Взять с него деньги",
        ],
        correctIndex: 2,
      },
    ],
  },
  q4: {
    id: "qq4",
    title: "Квест 4: гипотеза",
    topicLabel: "Квест",
    questions: [
      {
        id: 1,
        text: "Мини-гипотеза проекта должна включать…",
        options: [
          "Только название бренда",
          "Кто человек, его проблема и твоё решение",
          "Список друзей",
          "Дизайн будущего офиса",
        ],
        correctIndex: 1,
      },
    ],
  },
};

const tests = [
  {
    id: "t1",
    title: "Тест: предпринимательское мышление",
    topicLabel: "Мышление / предпринимательство",
    baseRewardPerCorrect: 8,
    questions: [
      {
        id: 1,
        text: "Ты замечаешь проблему у одноклассников. Твоя первая мысль?",
        options: [
          "Это не моё дело",
          "Кто-то когда-нибудь это решит",
          "Как на этом можно сделать полезный проект",
          "Пожаловаться учителю",
        ],
        correctIndex: 2,
      },
      {
        id: 2,
        text: "Что важнее на старте первого проекта?",
        options: [
          "Идеальный логотип",
          "Суперсложный сайт",
          "Понимание проблемы и живой контакт с людьми",
          "Сразу искать инвесторов",
        ],
        correctIndex: 2,
      },
      {
        id: 3,
        text: "Ошибка в проекте — это…",
        options: [
          "Позор",
          "Конец всему",
          "Сигнал, что нужно скорректировать действия",
          "Причина всё удалить и забыть",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "t2",
    title: "Тест: базовые финансы",
    topicLabel: "Деньги",
    baseRewardPerCorrect: 7,
    questions: [
      {
        id: 1,
        text: "Что такое актив?",
        options: [
          "То, что создаёт расходы",
          "То, что приносит или может приносить доход",
          "Любая дорогая вещь",
          "То, что купили родители",
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        text: "Ты получил 5 000 ₽. Что из этого самый здоровый подход?",
        options: [
          "Потратить всё сразу",
          "Спрятать и забыть",
          "Часть отложить, часть вложить в развитие себя/проекта",
          "Раздать друзьям",
        ],
        correctIndex: 2,
      },
    ],
  },
];

const updates = [
  {
    id: 1,
    title: "Новый лонгрид про предпринимательское мышление",
    date: "Сегодня",
  },
  { id: 2, title: "Добавлен тест по базовым финансам", date: "На этой неделе" },
];

const initialCommunityMembers = [
  {
    id: "u1",
    name: "Arsen",
    points: 880,
    bio: "Собирает IT-проекты и питчует инвесторам.",
  },
  {
    id: "u2",
    name: "Mira",
    points: 760,
    bio: "Делает образовательные продукты для подростков.",
  },
  {
    id: "u3",
    name: "Leo",
    points: 640,
    bio: "Лидирует в квестах по финансам и мышлению.",
  },
];

const initialUser = {
  id: "me",
  name: "Ты",
  initials: "ТЫ",
  age: 17,
  hasActiveSubscription: true,
  points: 20,
  completedMaterialsIds: [],
  completedTestIds: [],
  completedQuestIds: [],
};

function getLevelName(points) {
  if (points >= 300) return "Создатель";
  if (points >= 150) return "Исследователь";
  if (points >= 50) return "Ученик";
  return "Новичок";
}

function getAchievements(user, totals) {
  const ach = [];
  if (user.completedMaterialsIds.length >= 1)
    ach.push({ id: "a1", label: "Первый материал" });
  if (user.completedTestIds.length >= 1)
    ach.push({ id: "a2", label: "Первый тест" });
  if (user.completedQuestIds.length >= 1)
    ach.push({ id: "a3", label: "Первый квест" });
  if (user.points >= 50) ach.push({ id: "a4", label: "50+ очков" });
  if (
    user.completedMaterialsIds.length === totals.materials &&
    user.completedTestIds.length === totals.tests &&
    user.completedQuestIds.length === totals.quests &&
    totals.materials + totals.tests + totals.quests > 0
  ) {
    ach.push({ id: "a5", label: "Закрыл всё" });
  }
  return ach;
}

function QuoteRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % quotes.length),
      8000
    );
    return () => clearInterval(id);
  }, []);

  const q = quotes[index];

  return (
    <div className="text-sm text-zinc-300">
      <p className="italic">&laquo;{q.text}&raquo;</p>
      <p className="mt-1 text-xs text-zinc-500">— {q.author}</p>
    </div>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs transition ${
        active ? "bg-zinc-50 text-black" : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
      }`}
    >
      {children}
    </button>
  );
}

function Header({ page, setPage, user }) {
  const levelName = getLevelName(user.points);
  const links = [
    { id: "home", label: "Главная" },
    { id: "library", label: "Библиотека" },
    { id: "quests", label: "Квесты" },
    { id: "profile", label: "Профиль" },
    { id: "community", label: "Сообщество" },
    { id: "admin", label: "Админ" },
  ];

  return (
    <header className="border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-50"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-50 text-[11px] font-bold text-black">
            N
          </span>
          <span>NOESIS</span>
        </button>
        <nav className="hidden gap-2 text-xs md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`rounded-full border px-4 py-1.5 transition ${
                page === l.id
                  ? "border-zinc-50 bg-zinc-50 text-black"
                  : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-4 text-xs text-zinc-400 md:flex">
          <span>
            Статус: <span className="text-zinc-100">{levelName}</span>
          </span>
          <span>
            Очки: <span className="text-zinc-100">{user.points}</span>
          </span>
        </div>
      </div>
    </header>
  );
}

function SidebarUser({ user }) {
  return (
    <aside className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-zinc-50">
          {user.initials}
        </div>
        <p className="mt-3 text-sm font-medium text-zinc-50">{user.name}</p>
        <p className="text-xs text-zinc-500">{user.age} лет</p>
      </div>
      <button className="block w-full rounded-full bg-zinc-50 px-4 py-2 text-center text-xs font-medium text-black hover:bg-zinc-200">
        Продолжить обучение
      </button>
      <div className="border-t border-zinc-800 pt-3 text-[11px] text-zinc-500">
        <p>Личный трек, уровни, квесты, тесты — всё в одном профиле.</p>
      </div>
    </aside>
  );
}

function SubscriptionBadge({ user }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${
        user.hasActiveSubscription
          ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-300"
          : "border-zinc-700 bg-zinc-900 text-zinc-300"
      }`}
    >
      {user.hasActiveSubscription ? "Подписка активна" : "Подписка не активна"}
    </span>
  );
}

function LibraryCard({ material, isCompleted, onComplete, onOpen }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-5 text-sm">
      <div className="mb-2 flex items-center justify-between text-[11px] text-zinc-400">
        <span>{material.topic}</span>
        <span>
          {material.typeLabel} · {material.durationLabel}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-zinc-50">{material.title}</h3>
      <p className="mt-2 flex-1 text-xs text-zinc-400">{material.description}</p>
      <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500">
        <span>Награда: +{material.reward} очков</span>
        {isCompleted && <span className="text-emerald-300">Пройдено</span>}
      </div>
      <div className="mt-3 flex gap-2 text-xs">
        <button
          onClick={onOpen}
          className="rounded-full bg-zinc-50 px-4 py-1.5 font-medium text-black hover:bg-zinc-200"
        >
          Открыть урок
        </button>
        <button
          onClick={onComplete}
          className={`rounded-full border px-4 py-1.5 ${
            isCompleted
              ? "border-zinc-700 text-zinc-500 cursor-default"
              : "border-zinc-700 text-zinc-200 hover:border-zinc-500"
          }`}
        >
          {isCompleted ? "Отмечено" : "Отметить пройденным"}
        </button>
      </div>
    </div>
  );
}

function ProgressSummary({ user, totals }) {
  const completed =
    user.completedMaterialsIds.length +
    user.completedTestIds.length +
    user.completedQuestIds.length;
  const total = totals.materials + totals.tests + totals.quests;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const achievements = getAchievements(user, totals);

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-50">Прогресс и развитие</h2>
        <span className="text-xs text-zinc-400">
          Очки: <span className="text-zinc-50">{user.points}</span>
        </span>
      </div>
      <div className="mt-3 text-xs text-zinc-400 space-y-2">
        <div>
          <p>
            Материалы: {user.completedMaterialsIds.length} / {totals.materials}
          </p>
          <p>
            Тесты: {user.completedTestIds.length} / {totals.tests}
          </p>
          <p>
            Квесты: {user.completedQuestIds.length} / {totals.quests}
          </p>
        </div>
        <div>
          <p className="mb-1 text-zinc-300">Общий прогресс</p>
          <div className="h-2 w-full rounded-full bg-zinc-900">
            <div
              className="h-2 rounded-full bg-emerald-400 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">{percent}% от трека</p>
        </div>
        <div className="pt-2 border-t border-zinc-800">
          <p className="mb-2 text-zinc-300">Достижения</p>
          {achievements.length === 0 ? (
            <p className="text-[11px] text-zinc-500">
              Выполни первый материал, тест или квест — и здесь появятся медальки.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {achievements.map((a) => (
                <span
                  key={a.id}
                  className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300 border border-emerald-400/40"
                >
                  {a.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WhatsNew() {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-sm">
      <h2 className="text-sm font-semibold text-zinc-50">Что нового</h2>
      <div className="mt-3 space-y-2 text-xs text-zinc-400">
        {updates.map((u) => (
          <div key={u.id} className="flex items-center justify-between">
            <span>{u.title}</span>
            <span className="text-zinc-500">{u.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuizRunner({ quiz, onBack, onFinish }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qid, idx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const handleSubmit = () => {
    if (submitted) return;
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) correct += 1;
    });
    setSubmitted(true);
    onFinish(correct);
  };

  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={onBack}
          className="mb-4 text-xs text-zinc-500 hover:text-zinc-200"
        >
          ← Назад
        </button>
        <p className="text-[11px] text-zinc-400">{quiz.topicLabel}</p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          {quiz.title}
        </h1>
        <div className="mt-6 space-y-4">
          {quiz.questions.map((q) => (
            <div
              key={q.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 text-sm"
            >
              <p className="text-xs text-zinc-200 mb-3">{q.text}</p>
              <div className="space-y-2 text-xs">
                {q.options.map((opt, idx) => {
                  const selected = answers[q.id] === idx;
                  const isCorrect = submitted && idx === q.correctIndex;
                  const isWrong =
                    submitted && selected && idx !== q.correctIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.id, idx)}
                      className={`block w-full rounded-2xl border px-3 py-2 text-left transition ${
                        selected && !submitted
                          ? "border-zinc-50 bg-zinc-50 text-black"
                          : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-500"
                      } ${
                        isCorrect
                          ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                          : ""
                      } ${
                        isWrong
                          ? "border-red-500 bg-red-500/10 text-red-200"
                          : ""
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="mt-6 rounded-full bg-zinc-50 px-5 py-2 text-xs font-medium text-black hover:bg-zinc-200"
          >
            Завершить тест
          </button>
        ) : (
          <p className="mt-4 text-xs text-emerald-300">
            Результат учтён в прогрессе.
          </p>
        )}
      </div>
    </div>
  );
}

function HomePage({ setPage, user }) {
  return (
    <div className="px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <section className="space-y-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl lg:text-5xl">
            Будь лучше вчерашнего себя
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-zinc-400">
            Платформа для подростков, которые хотят развивать мышление,
            предпринимательские навыки и осознанность.
          </p>
          <div className="mx-auto max-w-md border-t border-zinc-800 pt-4 text-xs text-zinc-400">
            <QuoteRotator />
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => setPage("library")}
              className="rounded-full bg-zinc-50 px-5 py-2 text-xs font-medium text-black hover:bg-zinc-200"
            >
              Открыть библиотеку
            </button>
            <button
              onClick={() => setPage("quests")}
              className="rounded-full border border-zinc-700 bg-zinc-950 px-5 py-2 text-xs text-zinc-200 hover:border-zinc-500"
            >
              Пройти квест / тест
            </button>
          </div>
          <div className="pt-2">
            <SubscriptionBadge user={user} />
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-left">
            <h3 className="text-sm font-semibold text-zinc-50">
              Библиотека знаний
            </h3>
            <p className="mt-2 text-xs text-zinc-400">
              Статьи, видео, материалы и мини-курсы. Всё, чтобы понимать, как
              устроены мир и бизнес.
            </p>
            <button
              onClick={() => setPage("library")}
              className="mt-4 rounded-full bg-zinc-50 px-4 py-1.5 text-xs font-medium text-black hover:bg-zinc-200"
            >
              Перейти
            </button>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-left">
            <h3 className="text-sm font-semibold text-zinc-50">
              Интеллектуальные квесты
            </h3>
            <p className="mt-2 text-xs text-zinc-400">
              Короткие задания и тесты, которые проверяют мышление и дают
              мгновенную обратную связь.
            </p>
            <button
              onClick={() => setPage("quests")}
              className="mt-4 rounded-full border border-zinc-600 px-4 py-1.5 text-xs text-zinc-100 hover:border-zinc-400"
            >
              Начать квест
            </button>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-left">
            <h3 className="text-sm font-semibold text-zinc-50">
              Профиль развития
            </h3>
            <p className="mt-2 text-xs text-zinc-400">
              Следи за ростом навыков и статуса. Видно, как ты становишься
              лучше вчерашнего себя.
            </p>
            <button
              onClick={() => setPage("profile")}
              className="mt-4 rounded-full border border-zinc-600 px-4 py-1.5 text-xs text-zinc-100 hover:border-zinc-400"
            >
              Мой прогресс
            </button>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-left">
            <h3 className="text-sm font-semibold text-zinc-50">Сообщество</h3>
            <p className="mt-2 text-xs text-zinc-400">
              Умная среда единомышленников. Без шума и показухи — только
              развитие и идеи.
            </p>
            <button
              onClick={() => setPage("community")}
              className="mt-4 rounded-full border border-zinc-600 px-4 py-1.5 text-xs text-zinc-100 hover:border-zinc-400"
            >
              Посмотреть участников
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function LibraryPage({ user, materials, onCompleteMaterial, onOpenLesson }) {
  const [filter, setFilter] = useState("all");
  const filtered =
    filter === "all" ? materials : materials.filter((m) => m.topicKey === filter);

  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Библиотека
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Все материалы доступны по подписке: предпринимательство, мышление,
          психология, деньги. Лонгриды, статьи, видео и тесты.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <Pill active={filter === "all"} onClick={() => setFilter("all")}>
            Все
          </Pill>
          <Pill active={filter === "mindset"} onClick={() => setFilter("mindset")}>
            Мышление
          </Pill>
          <Pill active={filter === "business"} onClick={() => setFilter("business")}>
            Предпринимательство
          </Pill>
          <Pill active={filter === "money"} onClick={() => setFilter("money")}>
            Деньги
          </Pill>
          <Pill
            active={filter === "psychology"}
            onClick={() => setFilter("psychology")}
          >
            Психология
          </Pill>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((m) => (
            <LibraryCard
              key={m.id}
              material={m}
              isCompleted={user.completedMaterialsIds.includes(m.id)}
              onComplete={() => onCompleteMaterial(m.id)}
              onOpen={() => onOpenLesson(m.id)}
            />
          ))}
        </div>
        <p className="mt-6 text-[11px] text-zinc-500">
          *В релизе: конспекты, обсуждения, ссылки на дополнительные материалы и трек
          прогресса по каждому модулю.
        </p>
      </div>
    </div>
  );
}

function LessonPage({ material, onBack }) {
  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={onBack}
          className="mb-4 text-xs text-zinc-500 hover:text-zinc-200"
        >
          ← Назад в библиотеку
        </button>
        <p className="text-[11px] text-zinc-400">{material.topic}</p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          {material.title}
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          {material.typeLabel} · {material.durationLabel}
        </p>
        <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-black/60 text-xs text-zinc-500">
            Здесь будет видео / интерактив для урока
          </div>
        </div>
        {material.articleContent && (
          <div className="mt-6 space-y-3 rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-sm text-zinc-300">
            {material.articleContent.map((p, idx) => (
              <p key={idx} className="text-xs text-zinc-300">
                {p}
              </p>
            ))}
          </div>
        )}
        {!material.articleContent && (
          <p className="mt-6 text-xs text-zinc-500">
            В этом уроке пока нет статьи. В релизе здесь будут лонгриды, конспекты и
            практика.
          </p>
        )}
      </div>
    </div>
  );
}

function ProfilePage({ user, materialsCount, testsCount, questsCount }) {
  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[260px_minmax(0,1fr)]">
        <SidebarUser user={user} />
        <div className="space-y-6">
          <ProgressSummary
            user={user}
            totals={{
              materials: materialsCount,
              tests: testsCount,
              quests: questsCount,
            }}
          />
          <WhatsNew />
        </div>
      </div>
    </div>
  );
}

function QuestsPage({ user, onStartQuestTest, onStartMainTest }) {
  const completedSet = new Set(user.completedQuestIds);
  const firstIncompleteIndex = questsData.findIndex(
    (q) => !completedSet.has(q.id)
  );

  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Квесты и тесты
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Квесты идут цепочкой один за другим и фиксируют реальные действия. Тесты
          проверяют, как ты думаешь и что уже понимаешь.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <section className="space-y-3 rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-50">
                Интеллектуальные квесты
              </h2>
              <span className="text-[11px] text-zinc-500">
                Выполнено: {user.completedQuestIds.length} / {questsData.length}
              </span>
            </div>
            <div className="space-y-3">
              {questsData.map((q, index) => {
                const completed = completedSet.has(q.id);
                const locked =
                  !completed &&
                  firstIncompleteIndex !== -1 &&
                  index > firstIncompleteIndex;
                return (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-zinc-50">
                          {index + 1}. {q.title}
                        </p>
                        <p className="mt-1 text-[11px] text-zinc-500">
                          {q.description}
                        </p>
                      </div>
                      <div className="text-right text-[11px] text-zinc-500">
                        <p>Награда: +{q.reward} очков</p>
                        {completed && (
                          <p className="mt-1 text-emerald-300">Выполнено</p>
                        )}
                        {locked && !completed && (
                          <p className="mt-1 text-zinc-600">Откроется позже</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 text-xs">
                      <button
                        disabled={locked}
                        onClick={() => onStartQuestTest(q.id)}
                        className={`rounded-full px-4 py-1.5 ${
                          locked
                            ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
                            : "bg-zinc-50 text-black hover:bg-zinc-200"
                        }`}
                      >
                        {completed ? "Пройти ещё раз" : "Пройти квест"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="space-y-3 rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-sm">
            <h2 className="text-sm font-semibold text-zinc-50">
              Отдельные тесты
            </h2>
            <div className="space-y-3 text-xs">
              {tests.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3"
                >
                  <p className="text-xs font-medium text-zinc-50">{t.title}</p>
                  <p className="mt-1 text-[11px] text-zinc-500">
                    {t.topicLabel}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                    <span>
                      Награда: ~{t.baseRewardPerCorrect * t.questions.length} очков
                    </span>
                    {user.completedTestIds.includes(t.id) && (
                      <span className="text-emerald-300">Пройден</span>
                    )}
                  </div>
                  <button
                    onClick={() => onStartMainTest(t.id)}
                    className="mt-3 rounded-full bg-zinc-50 px-4 py-1.5 text-xs font-medium text-black hover:bg-zinc-200"
                  >
                    Пройти тест
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function CommunityPage({ members, currentUserId, onOpenMember }) {
  const sorted = [...members].sort((a, b) => b.points - a.points);
  const myIndex = sorted.findIndex((m) => m.id === currentUserId);

  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Сообщество
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Лидеры по очкам. В профилях в будущем будут треки развития, достижения и
          проекты.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sorted.map((m, index) => (
            <button
              key={m.id}
              onClick={() => onOpenMember(m.id)}
              className="flex items-center justify-between rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-left text-sm hover:border-zinc-600"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-[11px] text-zinc-50">
                  {m.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-50">
                    {index + 1}. {m.name}
                    {m.id === currentUserId && " (ты)"}
                  </p>
                  <p className="text-[11px] text-zinc-500">Очки: {m.points}</p>
                </div>
              </div>
              {index === 0 && (
                <span className="text-[11px] text-amber-400">Топ недели</span>
              )}
            </button>
          ))}
        </div>
        {myIndex !== -1 && (
          <p className="mt-4 text-[11px] text-zinc-500">
            Ты сейчас на {myIndex + 1}-м месте в таблице лидеров.
          </p>
        )}
      </div>
    </div>
  );
}

function MemberProfilePage({ member, onBack }) {
  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={onBack}
          className="mb-4 text-xs text-zinc-500 hover:text-zinc-200"
        >
          ← Назад к сообществу
        </button>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-zinc-50">
            {member.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-zinc-50">{member.name}</h1>
            <p className="text-xs text-zinc-400">Очки: {member.points}</p>
          </div>
        </div>
        <div className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-sm text-zinc-300">
          <p className="text-xs text-zinc-300">{member.bio}</p>
          <p className="mt-4 text-[11px] text-zinc-500">
            В релизе здесь будет прогресс по трекам, достижения, проекты и контакты
            участника.
          </p>
        </div>
      </div>
    </div>
  );
}

function AdminPage({
  materials,
  setMaterials,
  communityMembers,
  setCommunityMembers,
}) {
  const [title, setTitle] = useState("");
  const [topicKey, setTopicKey] = useState("business");
  const [reward, setReward] = useState(10);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPoints, setNewUserPoints] = useState(0);

  const handleAddMaterial = () => {
    if (!title.trim()) return;
    const newMaterial = {
      id: `m${Date.now()}`,
      title: title.trim(),
      description: "Новый материал, добавленный через админку.",
      topic:
        topicKey === "business"
          ? "Предпринимательство"
          : topicKey === "mindset"
          ? "Мышление"
          : topicKey === "psychology"
          ? "Психология"
          : "Деньги",
      topicKey,
      hasArticle: false,
      durationLabel: "5–10 мин",
      typeLabel: "article",
      reward: Number(reward) || 0,
    };
    setMaterials((prev) => [...prev, newMaterial]);
    setTitle("");
    setReward(10);
  };

  const handleAddUser = () => {
    if (!newUserName.trim()) return;
    const newMember = {
      id: `u${Date.now()}`,
      name: newUserName.trim(),
      points: Number(newUserPoints) || 0,
      bio: "Участник, добавленный через админку.",
    };
    setCommunityMembers((prev) => [...prev, newMember]);
    setNewUserName("");
    setNewUserPoints(0);
  };

  const handleRemoveUser = (id) => {
    setCommunityMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-sm">
          <h2 className="text-sm font-semibold text-zinc-50">
            Добавить материал
          </h2>
          <div className="mt-4 space-y-3 text-xs">
            <div>
              <p className="mb-1 text-zinc-400">Название</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-zinc-700 bg-black px-3 py-2 text-xs text-zinc-100 outline-none focus:border-zinc-400"
                placeholder="Например: Как проверить идею за неделю"
              />
            </div>
            <div>
              <p className="mb-1 text-zinc-400">Тема</p>
              <select
                value={topicKey}
                onChange={(e) => setTopicKey(e.target.value)}
                className="w-full rounded-2xl border border-zinc-700 bg-black px-3 py-2 text-xs text-zinc-100 outline-none focus:border-zinc-400"
              >
                <option value="business">Предпринимательство</option>
                <option value="mindset">Мышление</option>
                <option value="psychology">Психология</option>
                <option value="money">Деньги</option>
              </select>
            </div>
            <div>
              <p className="mb-1 text-zinc-400">Награда (очки)</p>
              <input
                type="number"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                className="w-full rounded-2xl border border-zinc-700 bg-black px-3 py-2 text-xs text-zinc-100 outline-none focus:border-zinc-400"
              />
            </div>
            <button
              onClick={handleAddMaterial}
              className="mt-2 rounded-full bg-zinc-50 px-4 py-1.5 text-xs font-medium text-black hover:bg-zinc-200"
            >
              Сохранить материал
            </button>
            <p className="mt-2 text-[11px] text-zinc-500">
              В релизе здесь можно будет прикреплять видео, тексты, тесты и
              дополнительные файлы.
            </p>
          </div>
        </section>
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-sm">
          <h2 className="text-sm font-semibold text-zinc-50">Пользователи</h2>
          <div className="mt-3 space-y-2 text-xs text-zinc-400 max-h-64 overflow-auto pr-1">
            {communityMembers.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-black/40 px-3 py-2"
              >
                <div>
                  <p className="text-xs text-zinc-100">{m.name}</p>
                  <p className="text-[11px] text-zinc-500">
                    Очки: {m.points}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveUser(m.id)}
                  className="rounded-full border border-zinc-700 px-3 py-1 text-[11px] text-zinc-300 hover:border-red-500 hover:text-red-300"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-3 text-xs">
            <p className="text-zinc-400">Добавить участника</p>
            <input
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Имя"
              className="w-full rounded-2xl border border-zinc-700 bg-black px-3 py-2 text-xs text-zinc-100 outline-none focus:border-zinc-400"
            />
            <input
              type="number"
              value={newUserPoints}
              onChange={(e) => setNewUserPoints(e.target.value)}
              placeholder="Очки"
              className="w-full rounded-2xl border border-zinc-700 bg-black px-3 py-2 text-xs text-zinc-100 outline-none focus:border-zinc-400"
            />
            <button
              onClick={handleAddUser}
              className="rounded-full bg-zinc-50 px-4 py-1.5 text-xs font-medium text-black hover:bg-zinc-200"
            >
              Добавить
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(initialUser);
  const [materials, setMaterials] = useState(baseMaterials);
  const [communityMembers, setCommunityMembers] = useState([
    ...initialCommunityMembers,
    {
      id: initialUser.id,
      name: initialUser.name,
      points: initialUser.points,
      bio: "Твой профиль в NOESIS. Здесь будет твой путь развития и проекты.",
    },
  ]);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizContext, setQuizContext] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const totals = {
    materials: materials.length,
    tests: tests.length,
    quests: questsData.length,
  };

  const handleCompleteMaterial = (id) => {
    setUser((prev) => {
      if (prev.completedMaterialsIds.includes(id)) return prev;
      const material = materials.find((m) => m.id === id);
      const add = material ? material.reward : 0;
      return {
        ...prev,
        points: prev.points + add,
        completedMaterialsIds: [...prev.completedMaterialsIds, id],
      };
    });
    setCommunityMembers((prev) =>
      prev.map((m) =>
        m.id === user.id ? { ...m, points: user.points + 1 } : m
      )
    );
  };

  const handleStartQuestTest = (questId) => {
    const quiz = questQuizzes[questId];
    if (!quiz) return;
    setActiveQuiz(quiz);
    setQuizContext({ type: "quest", questId });
  };

  const handleStartMainTest = (testId) => {
    const quiz = tests.find((t) => t.id === testId);
    if (!quiz) return;
    setActiveQuiz(quiz);
    setQuizContext({ type: "test", testId });
  };

  const handleQuizFinish = (correctCount) => {
    if (!quizContext || !activeQuiz) return;
    if (quizContext.type === "test") {
      const test = tests.find((t) => t.id === quizContext.testId);
      const rewardPer = test.baseRewardPerCorrect || 5;
      const reward = correctCount * rewardPer;
      setUser((prev) => {
        const already = prev.completedTestIds.includes(test.id);
        return {
          ...prev,
          points: prev.points + (already ? 0 : reward),
          completedTestIds: already
            ? prev.completedTestIds
            : [...prev.completedTestIds, test.id],
        };
      });
    } else if (quizContext.type === "quest") {
      const quest = questsData.find((q) => q.id === quizContext.questId);
      const reward = quest ? quest.reward : 10;
      setUser((prev) => {
        const already = prev.completedQuestIds.includes(quest.id);
        return {
          ...prev,
          points: prev.points + (already ? 0 : reward),
          completedQuestIds: already
            ? prev.completedQuestIds
            : [...prev.completedQuestIds, quest.id],
        };
      });
    }
    setCommunityMembers((prev) =>
      prev.map((m) =>
        m.id === user.id ? { ...m, points: user.points } : m
      )
    );
  };

  const handleOpenLesson = (id) => {
    setSelectedLessonId(id);
    setPage("lesson");
  };

  const currentLesson =
    selectedLessonId && materials.find((m) => m.id === selectedLessonId);

  const currentMember =
    selectedMemberId &&
    communityMembers.find((m) => m.id === selectedMemberId);

  let content = null;

  if (activeQuiz && quizContext) {
    content = (
      <QuizRunner
        quiz={activeQuiz}
        onBack={() => {
          setActiveQuiz(null);
          setQuizContext(null);
        }}
        onFinish={handleQuizFinish}
      />
    );
  } else if (page === "home") {
    content = <HomePage setPage={setPage} user={user} />;
  } else if (page === "library") {
    content = (
      <LibraryPage
        user={user}
        materials={materials}
        onCompleteMaterial={handleCompleteMaterial}
        onOpenLesson={handleOpenLesson}
      />
    );
  } else if (page === "lesson" && currentLesson) {
    content = (
      <LessonPage
        material={currentLesson}
        onBack={() => {
          setPage("library");
          setSelectedLessonId(null);
        }}
      />
    );
  } else if (page === "profile") {
    content = (
      <ProfilePage
        user={user}
        materialsCount={materials.length}
        testsCount={tests.length}
        questsCount={questsData.length}
      />
    );
  } else if (page === "quests") {
    content = (
      <QuestsPage
        user={user}
        onStartQuestTest={handleStartQuestTest}
        onStartMainTest={handleStartMainTest}
      />
    );
  } else if (page === "community" && currentMember) {
    content = (
      <MemberProfilePage
        member={currentMember}
        onBack={() => setSelectedMemberId(null)}
      />
    );
  } else if (page === "community") {
    content = (
      <CommunityPage
        members={communityMembers}
        currentUserId={user.id}
        onOpenMember={(id) => setSelectedMemberId(id)}
      />
    );
  } else if (page === "admin") {
    content = (
      <AdminPage
        materials={materials}
        setMaterials={setMaterials}
        communityMembers={communityMembers}
        setCommunityMembers={setCommunityMembers}
      />
    );
  } else {
    content = <HomePage setPage={setPage} user={user} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header page={page} setPage={setPage} user={user} />
      {content}
      <footer className="border-t border-zinc-800 bg-black mt-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} NOESIS · платформа развития мышления и
            предпринимательства
          </p>
          <div className="flex gap-4">
            <span>О платформе</span>
            <span>Поддержка</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
