import { GameEvent } from "./types";
import { EXPANDED_EVENTS } from "./events_pack2";
import { EXPANDED_EVENTS_PACK3 } from "./events_pack3";
import { EXPANDED_EVENTS_PACK4 } from "./events_pack4";
import { PROCEDURAL_EXPANSION_EVENTS } from "./events_expansion";

export const EVENTS: GameEvent[] = [
  ...EXPANDED_EVENTS,
  ...EXPANDED_EVENTS_PACK3,
  ...EXPANDED_EVENTS_PACK4,
  ...PROCEDURAL_EXPANSION_EVENTS,
  {
    id: "herald_tribute",
    characterId: "herald",
    text: {
      ru: "Милорд! Король требует выслать внеочередную дань на войну на юге!",
      en: "My Lord! The King demands extra tribute for his southern campaign!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Отправить золото", en: "Pay gold" },
        spokenOption: {
          ru: "Вариант один: подчиниться и выслать золото в королевскую ставку.",
          en: "Option one: obey the Crown and dispatch gold to royal headquarters.",
        },
        aftermath: {
          ru: "Король доволен вашей покорностью, но казна замка заметно опустела.",
          en: "The King is pleased with your loyalty, though the treasury lies depleted.",
        },
        delta: { treasury: -15, influence: 10 },
      },
      {
        id: "B",
        text: { ru: "Отказать королю", en: "Refuse the King" },
        spokenOption: {
          ru: "Вариант два: заявить, что в наших землях нет лишнего золота.",
          en: "Option two: proclaim our lands possess no surplus gold.",
        },
        aftermath: {
          ru: "Вы сохранили золото, но королевский двор теперь считает вас смутьяном.",
          en: "You kept the gold, yet the royal court now brands you a disloyal vassal.",
        },
        delta: { treasury: 5, influence: -15 },
      },
    ],
  },
  {
    id: "general_brigands",
    characterId: "general",
    text: {
      ru: "Разбойники в Черном лесу грабят обозы! Пора направить туда тяжелую кавалерию.",
      en: "Brigands in the Black Forest attack caravans! Send heavy cavalry at once.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Направить конницу", en: "Send cavalry" },
        spokenOption: {
          ru: "Вариант один: выслать рыцарский полк и зачистить лесной тракт.",
          en: "Option one: send knights to purge the woodland road.",
        },
        aftermath: {
          ru: "Торговцы ликуют и благодарят вас, но полк понес потери в засадах.",
          en: "Traders rejoice, but several brave knights fell in forest ambushes.",
        },
        delta: { treasury: -10, people: 10, army: -5 },
      },
      {
        id: "B",
        text: { ru: "Пусть нанимают охрану", en: "Hire guards" },
        spokenOption: {
          ru: "Вариант два: пусть купеческая гильдия сама платит наемникам.",
          en: "Option two: let the guild hire their own sellswords.",
        },
        aftermath: {
          ru: "Казна цела, но народ шепчется, что власть больше не может защитить дороги.",
          en: "Treasury spared, but people murmur that you fail to protect the realm.",
        },
        delta: { people: -10, treasury: 5 },
      },
    ],
  },
  {
    id: "peasant_harvest",
    characterId: "peasant",
    text: {
      ru: "Милорд, урожай в этом году скуден. Ослабьте подать зерном, иначе деревни вымрут!",
      en: "My Lord, the grain harvest failed. Reduce grain taxes or villages will starve!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Открыть амбары", en: "Open granaries" },
        spokenOption: {
          ru: "Вариант один: распечатать замковые закрома и раздать хлеб голодающим.",
          en: "Option one: open castle granaries and feed the starving peasants.",
        },
        aftermath: {
          ru: "Крестьяне молятся за ваше здравие, однако запасы замка истощены.",
          en: "The folk bless your mercy, yet winter reserves are severely depleted.",
        },
        delta: { people: 15, treasury: -10 },
      },
      {
        id: "B",
        text: { ru: "Взыскать налог сполна", en: "Collect full taxes" },
        spokenOption: {
          ru: "Вариант два: собрать подати до последнего мешка по закону предков.",
          en: "Option two: enforce strict tax collection by ancestral law.",
        },
        aftermath: {
          ru: "Подати собраны, но деревни ропщут и в сердцах людей зреет бунт.",
          en: "Taxes collected, but bitterness spreads and whispers of revolt grow.",
        },
        delta: { people: -15, treasury: 15 },
      },
    ],
  },
  {
    id: "bishop_tithe",
    characterId: "bishop",
    text: {
      ru: "Святая церковь молит о средствах на новый витражный собор во славу Всевышнего.",
      en: "The Holy Church seeks donations for a new grand cathedral to bless your reign.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Пожертвовать щедро", en: "Donate generously" },
        spokenOption: {
          ru: "Вариант один: выделить из казны сундуки золота на святое дело.",
          en: "Option one: allocate gold chests from treasury for the sacred temple.",
        },
        aftermath: {
          ru: "Церковь благословила ваше правление, но казначеи хватаются за голову.",
          en: "Clergy blessed your reign, but treasurers clutch their heads at the cost.",
        },
        delta: { treasury: -15, influence: 15 },
      },
      {
        id: "B",
        text: { ru: "Церковь и так богата", en: "Church has enough" },
        spokenOption: {
          ru: "Вариант два: напомнить отцам церкви об их собственных золотых кубках.",
          en: "Option two: remind bishops of their own gold chalices and vaults.",
        },
        aftermath: {
          ru: "Казна сохранена, но епископ грозит вам анафемой и небесной карой.",
          en: "Gold preserved, but the bishop mutters curses and threatens anathema.",
        },
        delta: { influence: -10, treasury: 5 },
      },
    ],
  },
  {
    id: "merchant_toll",
    characterId: "merchant",
    text: {
      ru: "Мы просим снизить пошлины на мосту через реку! Это привлечет заморских торговцев.",
      en: "Lower the bridge tolls! It will attract foreign caravans and enrich trade.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Снизить пошлины", en: "Lower tolls" },
        spokenOption: {
          ru: "Вариант один: урезать пошлины и открыть ворота чужеземным купцам.",
          en: "Option one: lower the river tariffs and welcome foreign merchants.",
        },
        aftermath: {
          ru: "Рынок наполнился редкими диковинами, народ доволен изобилием товаров.",
          en: "Markets burst with rare spices and cloth, bringing joy to townspeople.",
        },
        delta: { treasury: -5, people: 10, influence: 5 },
      },
      {
        id: "B",
        text: { ru: "Удвоить сбор", en: "Double tolls" },
        spokenOption: {
          ru: "Вариант два: удвоить плату за каждый въезжающий торговый обоз.",
          en: "Option two: double the tariff on every caravan crossing the river.",
        },
        aftermath: {
          ru: "Золото потекло в сундуки, но цены на хлеб и соль подскочили вдвое.",
          en: "Gold fills the coffers, but the cost of bread and salt has doubled.",
        },
        delta: { treasury: 15, people: -10 },
      },
    ],
  },
  {
    id: "inquisitor_witch",
    characterId: "bishop",
    text: {
      ru: "В северной деревне поймали знахарку. Инквизиция требует костра, но крестьяне бунтуют!",
      en: "A herbalist was caught in the north. The Inquisition demands the stake, but peasants riot!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Отдать инквизиции", en: "To the stake" },
        spokenOption: {
          ru: "Вариант один: предать знахарку священному огню ради спокойствия церкви.",
          en: "Option one: deliver her to holy fire to satisfy church inquisitors.",
        },
        aftermath: {
          ru: "Инквизиция довольна, но крестьяне оплакивают свою единственную целительницу.",
          en: "Inquisition is appeased, but peasants mourn their only true healer.",
        },
        delta: { influence: 15, people: -15 },
      },
      {
        id: "B",
        text: { ru: "Помиловать и взять лекарем", en: "Pardon as healer" },
        spokenOption: {
          ru: "Вариант два: помиловать знахарку и нанять её придворным лекарем.",
          en: "Option two: grant royal pardon and name her court physician.",
        },
        aftermath: {
          ru: "Народ восхищен вашей справедливостью, но священники шепчут о ереси.",
          en: "Folk admire your bravery, while friars accuse your court of heresy.",
        },
        delta: { influence: -15, people: 15 },
      },
    ],
  },
  {
    id: "treasurer_mint",
    characterId: "treasurer",
    text: {
      ru: "Милорд, мы можем тайно подмешать медь в золотые монеты. Казна быстро наполнится!",
      en: "My Lord, we can secretly debase gold coins with copper. The treasury will soar!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Чеканить порченую монету", en: "Debase coinage" },
        spokenOption: {
          ru: "Вариант один: отдать тайный приказ монетному двору плавить медь с золотом.",
          en: "Option one: order mint masters to blend cheap copper into royal coin.",
        },
        aftermath: {
          ru: "Казна мгновенно раздулась от золота, но торговцы быстро раскусили обман.",
          en: "Vaults overflow with coin, but angry merchants discover the deceit.",
        },
        delta: { treasury: 20, people: -15 },
      },
      {
        id: "B",
        text: { ru: "Сохранить чистоту чеканки", en: "Keep currency pure" },
        spokenOption: {
          ru: "Вариант два: отвергнуть подлость и чеканить только полновесный флорин.",
          en: "Option two: reject fraud and mint only pure noble florins.",
        },
        aftermath: {
          ru: "Честь вашего герба безупречна, хотя расходов на чеканку меньше не стало.",
          en: "Your royal honor shines, though the expense weighs heavy on the realm.",
        },
        delta: { treasury: -10, influence: 10 },
      },
    ],
  },
  {
    id: "general_drills",
    characterId: "general",
    text: {
      ru: "Солдаты обленились без войны. Требуются внеплановые учения и закупка нового оружия.",
      en: "The soldiers grow lax without war. We need mandatory drills and new iron pikes.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Провести учения", en: "Order drills" },
        spokenOption: {
          ru: "Вариант один: выдать жалование кузнецам и провести строевые маневры.",
          en: "Option one: pay the armorers and march troops into military maneuvers.",
        },
        aftermath: {
          ru: "Армия превратилась в грозный монолит, соседние бароны боятся вашей мощи.",
          en: "Your iron legions are feared by neighbors, but armorers emptied the vaults.",
        },
        delta: { treasury: -10, army: 15 },
      },
      {
        id: "B",
        text: { ru: "Отставить траты", en: "Decline drills" },
        spokenOption: {
          ru: "Вариант два: сэкономить золото и оставить солдат в покое.",
          en: "Option two: save the gold and keep the soldiers in barracks.",
        },
        aftermath: {
          ru: "Золото сохранено, но воевода сетует на ржавеющие мечи и разброд в строю.",
          en: "Gold saved, but officers lament rusted blades and lack of discipline.",
        },
        delta: { army: -10, treasury: 5 },
      },
    ],
  },
  {
    id: "jester_parody",
    characterId: "jester",
    text: {
      ru: "Звенят бубенцы, милорд! Разрешите я на ярмарке спародирую толстого епископа?",
      en: "Bells jingle, My Lord! May I mock the fat bishop at the feast today?",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Повесели народ", en: "Mock the bishop" },
        spokenOption: {
          ru: "Вариант один: дать добро шуту высмеять жадных прелатов перед толпой.",
          en: "Option one: let the fool mock greedy prelates before the laughing mob.",
        },
        aftermath: {
          ru: "Площадь хохотала до упаду, но епископ покидает замок в ярости.",
          en: "The crowds roared with laughter, yet the bishop left swearing revenge.",
        },
        delta: { people: 10, influence: -10 },
      },
      {
        id: "B",
        text: { ru: "В колодки за дерзость", en: "Pillory the fool" },
        spokenOption: {
          ru: "Вариант два: проучить наглеца и заковать шута в железные колодки.",
          en: "Option two: teach insolence a lesson and lock the fool in iron stocks.",
        },
        aftermath: {
          ru: "Церковь благодарит за почтение, но базарный люд притих и помрачнел.",
          en: "The church honors your piety, while townspeople grow sullen and wary.",
        },
        delta: { people: -5, influence: 5 },
      },
    ],
  },
  {
    id: "herald_quarantine",
    characterId: "herald",
    text: {
      ru: "В южных портах свирепствует моровая язва. Запереть городские врата и остановить всю торговлю?",
      en: "Black pestilence strikes southern docks! Shut the gates and halt all incoming trade?",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Жесткий карантин", en: "Total quarantine" },
        spokenOption: {
          ru: "Вариант один: поднять подъемные мосты, никого не впускать и не выпускать.",
          en: "Option one: raise drawbridges and bar all travel into the citadel.",
        },
        aftermath: {
          ru: "Мор обошел крепость стороной, хотя купцы понесли страшные убытки.",
          en: "Plague was averted, though merchant houses suffered catastrophic losses.",
        },
        delta: { treasury: -20, people: 15 },
      },
      {
        id: "B",
        text: { ru: "Торговля важнее", en: "Keep gates open" },
        spokenOption: {
          ru: "Вариант два: оставить врата распахнутыми ради притока торгового золота.",
          en: "Option two: keep roads open so royal trade taxes continue uninterrupted.",
        },
        aftermath: {
          ru: "Прибыль получена, но черная хворь просочилась в ремесленные кварталы.",
          en: "Tolls poured in, but pestilence soon infected crowded artisan districts.",
        },
        delta: { treasury: 10, people: -25 },
      },
    ],
  },
];
