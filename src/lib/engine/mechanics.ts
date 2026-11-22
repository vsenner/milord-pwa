import {
  ResourceStats,
  Choice,
  RunState,
  EndCondition,
} from "./types";

export const INITIAL_STATS: ResourceStats = {
  treasury: 50,
  influence: 50,
  people: 50,
  army: 50,
};

export function clamp(val: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, val));
}

export function checkEndCondition(stats: ResourceStats): EndCondition | null {
  if (stats.treasury <= 0) {
    return {
      cause: "treasury_empty",
      message: {
        ru: "Казна пуста. Наёмники перешли к врагу, а кредиторы разорвали ваше поместье.",
        en: "Treasury is empty. Mercenaries deserted, and creditors seized your lands.",
      },
    };
  }
  if (stats.treasury >= 100) {
    return {
      cause: "treasury_overflow",
      message: {
        ru: "Ваше несметное богатство вызвало зависть короля. Вас тихо отравили на пиру.",
        en: "Your immense wealth aroused the King's jealousy. You were poisoned at a banquet.",
      },
    };
  }
  if (stats.people <= 0) {
    return {
      cause: "people_empty",
      message: {
        ru: "Голод и мор выкосили крестьян. Некому собирать урожай и платить подати.",
        en: "Famine and plague wiped out the peasants. No one is left to farm or pay taxes.",
      },
    };
  }
  if (stats.people >= 100) {
    return {
      cause: "people_overflow",
      message: {
        ru: "Чернь почувствовала вседозволенность и установила народный совет. Вы изгнаны.",
        en: "The mob seized power and established a commune. You were exiled.",
      },
    };
  }
  if (stats.army <= 0) {
    return {
      cause: "army_empty",
      message: {
        ru: "Без гарнизона разбойники взяли замок приступом и спалили его дотла.",
        en: "With no garrison left, raiders stormed your keep and burned it to the ground.",
      },
    };
  }
  if (stats.army >= 100) {
    return {
      cause: "army_overflow",
      message: {
        ru: "Генералы сочли вас обузой и совершили военный переворот.",
        en: "Your generals deemed you obsolete and orchestrated a military coup.",
      },
    };
  }
  if (stats.influence <= 0) {
    return {
      cause: "influence_empty",
      message: {
        ru: "Ваш авторитет пал. Вас лишили титула и сослали в глухой монастырь.",
        en: "Your authority collapsed. The council stripped your title and exiled you.",
      },
    };
  }
  if (stats.influence >= 100) {
    return {
      cause: "influence_overflow",
      message: {
        ru: "Король испугался, что вы метите на трон, и приказал вас публично обезглавить.",
        en: "The King feared you coveted his throne and ordered your public execution.",
      },
    };
  }
  return null;
}

export function applyChoice(state: RunState, choice: Choice): RunState {
  const nextStats: ResourceStats = {
    treasury: clamp(state.stats.treasury + (choice.delta.treasury ?? 0)),
    influence: clamp(state.stats.influence + (choice.delta.influence ?? 0)),
    people: clamp(state.stats.people + (choice.delta.people ?? 0)),
    army: clamp(state.stats.army + (choice.delta.army ?? 0)),
  };

  const end = checkEndCondition(nextStats);

  return {
    day: state.day + 1,
    stats: nextStats,
    flags: { ...state.flags, ...(choice.setFlags ?? {}) },
    isGameOver: end !== null,
    endCondition: end,
  };
}
