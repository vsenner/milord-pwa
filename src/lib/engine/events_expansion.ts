import { GameEvent } from "./types";

export const PROCEDURAL_EXPANSION_EVENTS: GameEvent[] = [
  {
    id: "alchemist_transmutation",
    characterId: "jester",
    text: {
      ru: "Загадочный звездочет клянется, что научился обращать свинец в серебро, но требует для лаборатории всю замковую библиотеку!",
      en: "A mysterious astrologer claims he can turn lead into silver, demanding the entire library for his furnace!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Отдать книги и свинец", en: "Yield library" },
        spokenOption: {
          ru: "Вариант один: пожертвовать древними книгами ради призрачного богатства.",
          en: "Option one: sacrifice ancestral tomes for the promise of infinite silver.",
        },
        aftermath: {
          ru: "Опыт окончился взрывом и едким дымом. Ученые монахи в глубокой печали.",
          en: "The experiment ended in foul smoke and ruin. Monks mourn lost ancient scrolls.",
        },
        delta: { treasury: -15, influence: -10, people: 5 },
      },
      {
        id: "B",
        text: { ru: "Выгнать астролога", en: "Banish stargazer" },
        spokenOption: {
          ru: "Вариант два: спустить на алхимика охотничьих псов и сберечь фолианты.",
          en: "Option two: loose the hounds upon the charlatan and protect our chronicles.",
        },
        aftermath: {
          ru: "Архивы сохранены, церковь хвалит вашу мудрость и неприятие оккультизма.",
          en: "The archives remain safe, and bishops praise your rejection of the occult.",
        },
        delta: { influence: 10, treasury: 5 },
      },
    ],
  },
  {
    id: "nordic_raiders",
    characterId: "general",
    text: {
      ru: "Драккары северян показались в устье реки! Их ярл требует выкуп, угрожая спалить прибрежные села.",
      en: "Northmen dragonships spotted in the river estuary! Their jarl demands tribute or will burn coastal crofts.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Дать бой у реки", en: "Give battle" },
        spokenOption: {
          ru: "Вариант один: выстроить стену щитов и утопить захватчиков в реке.",
          en: "Option one: form a shield wall and drown the invaders in the current.",
        },
        aftermath: {
          ru: "Северяне разбиты и бежали! Воины гордятся победой, хоть и пролилась кровь.",
          en: "The raiders were routed! The army hails your valor, though many brave men bled.",
        },
        delta: { army: 15, people: 10, treasury: -10 },
      },
      {
        id: "B",
        text: { ru: "Откупиться серебром", en: "Pay danegeld" },
        spokenOption: {
          ru: "Вариант два: выплатить требуемую дань, чтобы избежать разорения берегов.",
          en: "Option two: pay the demanded silver tribute to spare coastal farmsteads.",
        },
        aftermath: {
          ru: "Северяне уплыли с полными сундуками, но войско ропщет из-за позорного мира.",
          en: "Northmen sailed off wealthy, but your generals curse the shameful truce.",
        },
        delta: { treasury: -25, army: -15, influence: -10 },
      },
    ],
  },
  {
    id: "plague_doctor",
    characterId: "peasant",
    text: {
      ru: "В предместье прибыл человек в клювастой кожаной маске. Он предлагает выжигать чумные язвы раскаленным железом.",
      en: "A masked plague doctor arrived in the borough, offering to cauterize black sores with red-hot irons.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Доверить ему больных", en: "Permit treatments" },
        spokenOption: {
          ru: "Вариант один: наделить лекаря полной властью в чумных бараках.",
          en: "Option one: grant the bird-masked healer total authority over quarantine pits.",
        },
        aftermath: {
          ru: "Жестокие меры остановили заразу, но народ содрогается от одного вида клюва.",
          en: "Harsh burning stemmed the infection, though townsfolk shudder in fear.",
        },
        delta: { people: 10, treasury: -10, influence: 5 },
      },
      {
        id: "B",
        text: { ru: "Прогнать знахаря", en: "Expel physician" },
        spokenOption: {
          ru: "Вариант два: запретить дикие опыты и уповать на святые молитвы.",
          en: "Option two: forbid cruel branding and rely strictly on church prayers.",
        },
        aftermath: {
          ru: "Молитвы утешают людей, но мор уносит целые семьи бедняков.",
          en: "Prayers offer solace, but fever claims entire households of the poor.",
        },
        delta: { people: -20, influence: 10 },
      },
    ],
  },
  {
    id: "royal_hunt_trespass",
    characterId: "herald",
    text: {
      ru: "Свита кузена короля во время охоты вытоптала крестьянские посевы пшеницы. Крестьяне окружили дворян с вилами!",
      en: "The King's cousin and his hunting retinue trampled peasant crops. Peasants cornered nobles with pitchforks!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Защитить крестьян", en: "Defend peasants" },
        spokenOption: {
          ru: "Вариант один: заставить дворян оплатить весь потравленный хлеб.",
          en: "Option one: compel noble hunters to pay fair recompense for destroyed grain.",
        },
        aftermath: {
          ru: "Крестьяне славят ваш суд, но оскорбленный кузен нажалуется королю.",
          en: "The folk cheer your justice, but the insulted noble rides off plotting revenge.",
        },
        delta: { people: 20, influence: -15 },
      },
      {
        id: "B",
        text: { ru: "Разогнать чернь", en: "Disperse peasants" },
        spokenOption: {
          ru: "Вариант два: выслать стражу и выпороть бунтующих простолюдинов.",
          en: "Option two: dispatch guardsmen to flog the insolent rabble.",
        },
        aftermath: {
          ru: "Знать довольна вашим почтением, но деревня замкнулась в мрачной ненависти.",
          en: "The nobility commends your respect, while the villagers harbor silent hatred.",
        },
        delta: { influence: 15, people: -20 },
      },
    ],
  },
  {
    id: "holy_relic_theft",
    characterId: "bishop",
    text: {
      ru: "Из кафедрального собора похищена золотая чаша с мощами святого Стефана! Епископ обвиняет городскую стражу.",
      en: "The golden reliquary of St. Stephen was stolen from the altar! The bishop accuses the town guards.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Обыскать казармы", en: "Search barracks" },
        spokenOption: {
          ru: "Вариант один: устроить повальный обыск среди верных солдат гарнизона.",
          en: "Option one: subject all loyal garrison guards to humiliating searches.",
        },
        aftermath: {
          ru: "Реликвия найдена у пьяного каптенармуса. Церковь умиротворена, армия уязвлена.",
          en: "The cup was recovered from a drunk soldier. The church rejoices; troops sulk.",
        },
        delta: { influence: 15, army: -15 },
      },
      {
        id: "B",
        text: { ru: "Защитить стражу", en: "Shield the guards" },
        spokenOption: {
          ru: "Вариант два: пресечь нападки на воинов и отлить новую чашу за счет казны.",
          en: "Option two: defend soldier honor and forge a replacement chalice from treasury.",
        },
        aftermath: {
          ru: "Воины преданы вам как никогда, но священники грозят закрыть храмы.",
          en: "Soldiers swear loyalty, yet furious priests threaten to shutter church doors.",
        },
        delta: { army: 15, treasury: -15, influence: -10 },
      },
    ],
  },
];
