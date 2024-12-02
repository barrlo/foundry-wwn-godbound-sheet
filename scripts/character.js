import {BarrloDice} from './dice.js';

export const getEffort = (owner, gifts) => {
    const effortGiftFilterFunc = gift => gift.name.toLowerCase().trim().includes('effort of the word');
    const dayGiftFilterFunc = gift => gift.system.time === 'Day';
    const sceneGiftFilterFunc = gift => gift.system.time === 'Scene';
    const untilCancelledGiftFilterFunc = gift => gift.system.time === 'Until Cancelled';

    const effortGifts = gifts.greater.filter(effortGiftFilterFunc).concat(gifts.lesser.filter(effortGiftFilterFunc));
    const dayGifts = gifts.greater.filter(dayGiftFilterFunc).concat(gifts.lesser.filter(dayGiftFilterFunc));
    const sceneGifts = gifts.greater.filter(sceneGiftFilterFunc).concat(gifts.lesser.filter(sceneGiftFilterFunc));
    const untilCancelledGifts = gifts.greater
        .filter(untilCancelledGiftFilterFunc)
        .concat(gifts.lesser.filter(untilCancelledGiftFilterFunc));

    const day = dayGifts.filter(gift => gift.system.isInUse).length;
    const scene = sceneGifts.filter(gift => gift.system.isInUse).length;
    const untilCancelled = untilCancelledGifts.filter(gift => gift.system.isInUse).length;
    const total = 2 + (owner.system.details.level - 1) + effortGifts.length;
    const remaining = total - day - scene - untilCancelled;

    return {
        day,
        remaining,
        scene,
        total,
        untilCancelled
    };
};

export const getGifts = owner => {
    const greaterList = [
        'all-encompassing presence',
        'faster than thought',
        'untouchable',
        'the maker’s eyes',
        "the maker's eyes",
        'perpetual perfection',
        'reverence of steel',
        // skipped: beasts, bow, command
        'no release',
        'reaping word',
        'summons to day',
        'conviction of error',
        'impenetrable deceit',
        'walking ghost',
        // skipped: earth, endurance
        'cornucopian blessing',
        'sever the line',
        'unending abundance',
        // skipped: fire, health
        'the exodus road',
        'the hour of need',
        'the path of racing dawn',
        'disclose the flaw',
        'irresistible query',
        'the omniscient scholar',
        // skipped: luck
        'leap the moon',
        "loosening god's teeth",
        'thews of the gods',
        'a darkness at noon',
        'flesh of shadows',
        'a speaker in dreams',
        'a heart like clay',
        'infectious passion',
        'a song buried deep',
        'river tamer',
        'salt-spray purity',
        'tsunami hand',
        'boreal spike',
        'fury of the heavens',
        'voice of the winds',
        // skipped: sorcery, sun
        'cutting the crimson road',
        'the path through war',
        'shattering hand',
        'a hand on the balance',
        'sundered moment',
        'reweave time',
        // skipped: wealth
        // lexicon
        // skipped: birds, cities, dance, desert, desire, engineering, entropy, fear, insects, intoxication
        'infectious delirium',
        'insane logic',
        'eyes of unreason',
        // skipped: murder, music, network
        'a calamity averted',
        'invincible defender',
        'mutable wards',
        // skipped: theft, underworld
        'bloody vengeance',
        'final reckoning',
        'pursuit of the fury',
        'eater of legions',
        'pavis of blood and iron',
        "the war-god's chosen",
        // skipped: winter
        // lexicon concept words
        // skipped: artificial intelligence
        'iron scales of the god-wyrm',
        "legion's bane",
        'world eater'
        // skipped: faerie queen, lich king, peak human
    ];
    const lesserList = [
        'divine wrath',
        'corona of fury',
        'effort of the word',
        'influence of the word',
        'excellence of the word',
        'all directions as one',
        'flickering advance',
        'mist on water',
        'the storm breaks',
        'swifter than the sun',
        'walk between the rain',
        'faultless repair',
        'command the wheels',
        'hammerhand',
        'mark the maker',
        'ten thousand tools',
        'transmuter',
        // skipped: beasts, bow, command
        'keeper of the graves',
        'mantle of quietus',
        'a pale crown beckons',
        'scythe hand',
        'white bone harvest',
        'withholding the mercy',
        'deceiver’s unblinking Eye',
        "deceiver's unblinking Eye",
        'a familiar face',
        'liar’s flawless grace',
        "liar's flawless grace",
        'perfect masquerade',
        'shadow play',
        'veiled step',
        // skipped: earth, endurance
        'birth blessing',
        'a second spring',
        'seeds of death',
        'a sense of ash',
        'touch of green restraint',
        'withering curse',
        // skipped: fire, health
        'dust at your heels',
        'know the path',
        'master of the key',
        'opening the way',
        'swift progress',
        'untroubled passage',
        'the best course',
        'the best-laid plans',
        'excision of understanding',
        'a truth that burns',
        'the unveiled truth',
        'a word far off',
        // skipped: luck
        'descent of the mountain',
        'falling meteor strike',
        'fists of black iron',
        'shoulders wide as the world',
        'stronger than you',
        'surge of strength',
        'damn their eyes',
        'the darkling stairs',
        'knives of night',
        'a road of shadows',
        'the still silence of sleep',
        'welcoming the dusk',
        'banner of passion',
        'fashioning a friend',
        'follow the threads',
        'heart of the lion',
        "snuff the heart's candle",
        'terrifying mien',
        'body of water',
        'crushing depths',
        'living torrent',
        'lord of the waters',
        'secrets of the deep',
        'walking with the tide',
        'the clouds below',
        'eyes above',
        'rain of lightning',
        'sapphire wings',
        'stormsword',
        'windsinger',
        // skipped: sorcery, sun
        'contempt of distance',
        'nine iron walls',
        'steel without end',
        'thirsting razor',
        'through a red forest',
        'unerring blade',
        'echoes of the past',
        'immediate foresight',
        'look forward',
        'prophetic insight',
        'reflex of regret',
        'withering hour',
        // skipped: wealth
        // lexicon
        // skipped: birds, cities, dance, desert, desire, engineering, entropy, fear, insects, intoxication
        'ease the ache',
        'hallucinatory world',
        'idee fixe',
        'kiss of madness',
        'puppets of insanity',
        'unacknowledged truth',
        // skipped: murder, music, network
        'blunt the fang',
        'braced for impact',
        'eternal vigilance',
        'sanctified shield',
        'shed the black rain',
        'ward the walls',
        // skipped: theft, underworld
        'blood for blood',
        'conditional forgiveness',
        'furious counterstrike',
        'mantle of nemesis',
        'measure for measure',
        'sanctified violence',
        'stain of the sin',
        'forced march',
        "general's escort",
        'know the terrain',
        'strategic insight',
        'voice of command',
        'will of the spear-throne',
        // skipped: winter
        // lexicon concept words
        // skipped: artificial intelligence
        'a second skin',
        'breath of death',
        'inexhaustible hoard',
        'sinews of the serpent',
        'terror of the skies',
        'whispers of the wyrm',
        // skipped: faerie queen, lich king, peak human
        'new gift'
    ];

    const arts = owner.items.filter(
        item => item.type === 'art' || (item.type === 'item' && item.system.type === 'gift')
    );
    arts.forEach(art => art.update({'system.type': 'gift'}));

    const greater = arts.filter(
        art =>
            greaterList.includes(art.name.toLowerCase().trim()) ||
            art.system.isGreater ||
            art.name.toLowerCase().trim().includes(' - greater')
    );
    const lesser = arts.filter(
        art =>
            (lesserList.includes(art.name.toLowerCase().trim()) && !art.system.isGreater) ||
            art.name.toLowerCase().trim().includes(' - lesser')
    );

    const numberOfExtraWords = owner.system.details.class.split(',').length - 3;
    let pointsSpent = greater.length * 2 + lesser.length;
    if (numberOfExtraWords > 0) {
        pointsSpent += numberOfExtraWords * 3;
    }

    const totalPoints = 6 + (owner.system.details.level - 1) * 2;
    const remainingPoints = totalPoints - pointsSpent;

    return {
        greater,
        lesser,
        remainingPoints,
        totalPoints
    };
};

export const onAddGiftClick = async (event, owner, isGreater) => {
    event.preventDefault();

    const itemData = {
        name: 'New Gift',
        system: {
            description: '',
            isGreater,
            isInUse: false,
            source: '',
            time: '',
            type: 'gift'
        },
        type: 'item'
    };
    owner.createEmbeddedDocuments('Item', [itemData]);
};

export const onResetEffortClick = (event, owner) => {
    event.preventDefault();

    const gifts = owner.items.filter(item => item.system.type === 'gift');
    gifts.forEach(gift => {
        const itemId = gift.id;
        const item = owner.items.get(itemId);
        item.update({'system.isInUse': false});
    });
};

export const rollFrayDice = async owner => {
    const rollParts = [owner.system.godbound.frayDice];
    const data = {
        actor: owner,
        roll: {
            type: 'fraydice'
        }
    };

    return await BarrloDice.Roll({
        parts: rollParts,
        data: data,
        skipDialog: true,
        speaker: ChatMessage.getSpeaker({actor: owner}),
        flavor: 'Fray Dice',
        title: 'Fray Dice'
    });
};
