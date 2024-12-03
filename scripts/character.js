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

    const day =
        dayGifts.filter(gift => gift.system.isInUse).length +
        (owner.system.godbound ? owner.system.godbound.miracleCount || 0 : 0);
    const scene = sceneGifts.filter(gift => gift.system.isInUse).length;
    const untilCancelled = untilCancelledGifts.filter(gift => gift.system.isInUse).length;
    const total = 2 + (owner.system.details.level - 1) + effortGifts.length;
    const remaining = total - day - scene - untilCancelled;

    return {
        ...owner.system.godbound.effort,
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
    const apotheosisList = [
        'receive the incense of faith',
        'sanctify shrine',
        'smite the apostate',
        'hear prayer',
        'perceive the petitioner',
        'mark of the prophet',
        'attend the faithful',
        'to bless the nations'
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
    const apotheosis = arts.filter(art => apotheosisList.includes(art.name.toLowerCase().trim()));

    const numberOfExtraWords = owner.system.details.class.split(',').length - 3;
    let pointsSpent = greater.length * 2 + lesser.length;
    if (numberOfExtraWords > 0) {
        pointsSpent += numberOfExtraWords * 3;
    }

    const totalPoints = 6 + (owner.system.details.level - 1) * 2;
    const remainingPoints = totalPoints - pointsSpent;

    return {
        ...owner.system.godbound.gifts,
        apotheosis,
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

export const onLevelChange = async (owner, level) => {
    await owner.update({'system.thac0.bba': level});

    const apotheosisGifts = owner.system.godbound.gifts.apotheosis || [];
    const receiveTheIncenseOfFaith = apotheosisGifts.find(
        gift => gift.name.toLowerCase().trim() === 'receive the incense of faith'
    );
    const sanctifyShrine = apotheosisGifts.find(gift => gift.name.toLowerCase().trim() === 'sanctify shrine');
    const smiteTheApostate = apotheosisGifts.find(gift => gift.name.toLowerCase().trim() === 'smite the apostate');
    const hearPrayer = apotheosisGifts.find(gift => gift.name.toLowerCase().trim() === 'hear prayer');
    const perceiveThePetitioner = apotheosisGifts.find(
        gift => gift.name.toLowerCase().trim() === 'perceive the petitioner'
    );
    const markOfTheProphet = apotheosisGifts.find(gift => gift.name.toLowerCase().trim() === 'mark of the prophet');
    const attendTheFaithful = apotheosisGifts.find(gift => gift.name.toLowerCase().trim() === 'attend the faithful');
    const toBlessTheNations = apotheosisGifts.find(gift => gift.name.toLowerCase().trim() === 'to bless the nations');

    if (level >= 2 && !receiveTheIncenseOfFaith) {
        const description =
            'Gained at second level, the Godbound becomes capable of receiving worship from mortal believers and can begin forming their own cult.';
        const itemData = {
            name: 'Receive the Incense of Faith',
            system: {
                description,
                enrichedDescription: await TextEditor.enrichHTML(description, {async: true}),
                isGreater: false,
                isInUse: false,
                source: 'Apotheosis',
                time: 'Permanent',
                type: 'gift'
            },
            type: 'item'
        };
        await owner.createEmbeddedDocuments('Item', [itemData]);
    } else if (level < 2 && receiveTheIncenseOfFaith) {
        await owner.deleteEmbeddedDocuments('Item', [receiveTheIncenseOfFaith._id]);
    }

    if (level >= 3) {
        if (!sanctifyShrine) {
            const description =
                "Gained at third level, the Godbound's worshipers can now sanctify temples and shrines to their deity. When properly consecrated, the Godbound can choose to perceive anything going on within their precincts, though they must intentionally choose to watch. They can target a gift or miracle at any person within the sacred grounds at the usual costs in Effort. Such a marvel is free the first time the Godbound so acts in a day, but each successive wonder requires the Godbound to Commit Effort for the day. Properly sanctifying a shrine requires rites and components costing Wealth equal to the Godbound's level, with increases in their level requiring additional expenditures. If the shrine is desecrated, it must be reconsecrated at the full cost.";
            const itemData = {
                name: 'Sanctify Shrine',
                system: {
                    description,
                    enrichedDescription: await TextEditor.enrichHTML(description, {async: true}),
                    isGreater: false,
                    isInUse: false,
                    source: 'Apotheosis',
                    time: 'Permanent',
                    type: 'gift'
                },
                type: 'item'
            };
            await owner.createEmbeddedDocuments('Item', [itemData]);
        }

        if (!smiteTheApostate) {
            const description =
                'Also at third level, the Godbound can instantly kill an offending worshiper or afflict them with some debilitating suffering appropriate to their Words. This torment lasts as long as the Godbound desires. If another god accepts the worshiper, however, the curse is lifted.';
            const itemData = {
                name: 'Smite the Apostate',
                system: {
                    description,
                    enrichedDescription: await TextEditor.enrichHTML(description, {async: true}),
                    isGreater: false,
                    isInUse: false,
                    source: 'Apotheosis',
                    time: 'Permanent',
                    type: 'gift'
                },
                type: 'item'
            };
            await owner.createEmbeddedDocuments('Item', [itemData]);
        }
    } else if (level < 3) {
        if (sanctifyShrine) {
            await owner.deleteEmbeddedDocuments('Item', [sanctifyShrine._id]);
        }

        if (smiteTheApostate) {
            await owner.deleteEmbeddedDocuments('Item', [smiteTheApostate._id]);
        }
    }

    if (level >= 4 && !hearPrayer) {
        const description =
            'At fourth level, the Godbound is capable of hearing the prayers of their faithful. These usually are a subconscious sussurus of petitions, but they can specifically “listen” for particular topics or people if they wish, becoming alerted when those topics arise or those people address them. The Godbound can communicate with their faithful during their prayers, though this inward voice is subtle and does not compel obedience.';
        const itemData = {
            name: 'Hear Prayer',
            system: {
                description,
                enrichedDescription: await TextEditor.enrichHTML(description, {async: true}),
                isGreater: false,
                isInUse: false,
                source: 'Apotheosis',
                time: 'Permanent',
                type: 'gift'
            },
            type: 'item'
        };
        await owner.createEmbeddedDocuments('Item', [itemData]);
    } else if (level < 2 && hearPrayer) {
        await owner.deleteEmbeddedDocuments('Item', [hearPrayer._id]);
    }

    if (level >= 5 && !perceiveThePetitioner) {
        const description =
            "At fifth level, the Godbound can see a particular worshiper and their surroundings with an action's focus, knowing everything about their immediate situation that the worshiper knows. This doesn't grant deep or subtle knowledge of the situation, but it's enough to make their current circumstances clear.";
        const itemData = {
            name: 'Perceive the Petitioner',
            system: {
                description,
                enrichedDescription: await TextEditor.enrichHTML(description, {async: true}),
                isGreater: false,
                isInUse: false,
                source: 'Apotheosis',
                time: 'Permanent',
                type: 'gift'
            },
            type: 'item'
        };
        await owner.createEmbeddedDocuments('Item', [itemData]);
    } else if (level < 2 && perceiveThePetitioner) {
        await owner.deleteEmbeddedDocuments('Item', [perceiveThePetitioner._id]);
    }

    if (level >= 6 && !markOfTheProphet) {
        const description =
            "At sixth level, the Godbound can consecrate specific worshipers as favored disciples or high priests. One disciple may be chosen for each level of the Godbound, but only one high pontiff can be chosen. If you've access to the deluxe version of Godbound and the mortal creation rules, the disciples instantly become heroic mortals of a level equal to half their patron's level, rounded up and the high priest becomes a heroic mortal of the Godbound's level. Both usually take talents reflective of their patron's portfolio, including a gift or two. If the mortal hero rules are unavailable, treat the disciples as Skilled Mages or Major Heroes from the mortal section of the bestiary chapter, and the high priest as a lesser Eldritch. This consecrating process takes only a moment, but the consecration cannot be taken from the acolyte until they are dead, even if they later leave their god's service.";
        const itemData = {
            name: 'Mark of the Prophet',
            system: {
                description,
                enrichedDescription: await TextEditor.enrichHTML(description, {async: true}),
                isGreater: false,
                isInUse: false,
                source: 'Apotheosis',
                time: 'Permanent',
                type: 'gift'
            },
            type: 'item'
        };
        await owner.createEmbeddedDocuments('Item', [itemData]);
    } else if (level < 2 && markOfTheProphet) {
        await owner.deleteEmbeddedDocuments('Item', [markOfTheProphet._id]);
    }

    if (level >= 7 && !attendTheFaithful) {
        const description =
            'At seventh level, the Godbound can manifest before a praying worshiper, instantly appearing before them no matter how far away the divinity may be, even from a distant realm. This manifestation lasts no longer than a scene, however, before the Godbound returns to their original location and cannot use this gift again for a day.';
        const itemData = {
            name: 'Attend the Faithful',
            system: {
                description,
                enrichedDescription: await TextEditor.enrichHTML(description, {async: true}),
                isGreater: false,
                isInUse: false,
                source: 'Apotheosis',
                time: 'Permanent',
                type: 'gift'
            },
            type: 'item'
        };
        await owner.createEmbeddedDocuments('Item', [itemData]);
    } else if (level < 2 && attendTheFaithful) {
        await owner.deleteEmbeddedDocuments('Item', [attendTheFaithful._id]);
    }

    if (level >= 8 && !toBlessTheNations) {
        const description =
            "At eighth level the Godbound can selectively bless or blight the fortunes of a faction that contains a substantial number of their followers. If the faction has a number of worshipers present equal in number to a group of one Power size smaller, the Godbound can selectively add or subtract 2 from any action die roll they take. Thus, if a city of Power 2 had a Power 1 village's worth of faithful among them, they would be subject to the Godbound's influence. The Godbound must be aware of the effort the faction is making to influence the roll, but usually only the most subtle and secretive actions can escape the notice of such a large number of worshipers and their prayers.";
        const itemData = {
            name: 'To Bless the Nations',
            system: {
                description,
                enrichedDescription: await TextEditor.enrichHTML(description, {async: true}),
                isGreater: false,
                isInUse: false,
                source: 'Apotheosis',
                time: 'Permanent',
                type: 'gift'
            },
            type: 'item'
        };
        await owner.createEmbeddedDocuments('Item', [itemData]);
    } else if (level < 2 && toBlessTheNations) {
        await owner.deleteEmbeddedDocuments('Item', [toBlessTheNations._id]);
    }
};

export const onMiracleClick = (event, owner) => {
    event.preventDefault();

    owner.update({
        'system.godbound.miracleCount': (owner.system.godbound.miracleCount || 0) + 1
    });
};

export const onResetEffortClick = (event, owner) => {
    event.preventDefault();

    const gifts = owner.items.filter(item => item.system.type === 'gift');
    gifts.forEach(gift => {
        const itemId = gift.id;
        const item = owner.items.get(itemId);
        item.update({'system.isInUse': false});
    });

    owner.update({
        'system.godbound.miracleCount': 0
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
