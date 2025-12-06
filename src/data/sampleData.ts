export interface BestCall {
    market: string;
    entry_price: number;
    settlement_price: number;
    entry_date: string;
    resolution_date: string;
    context?: string;
}

export interface WorstMiss {
    market: string;
    exit_price: number;
    settlement_price: number;
    context?: string;
}

export interface RecommendedMarket {
    title: string;
    price: number;
    volume: string;
    category: string;
}

export interface Worldview {
    polls_vs_markets: number;
    incumbents_vs_challengers: number;
    stability_vs_chaos: number;
    institutions_vs_outsiders: number;
}

export interface CryptoBet {
    market: string;
    entry_price: number;
    settlement_price: number;
    entry_date: string;
    resolution_date: string;
    context?: string;
}

export interface WrappedData {
    user_id: string;
    wallet_address: string;
    total_usdc_deployed: number;
    total_markets: number;
    percentile: number;
    days_active: number;
    longest_streak: number;
    streak_dates: [string, string];
    streak_context?: string;
    top_category: string;
    category_breakdown: Record<string, number>;
    category_subtext?: string;
    contrarian_score: number;
    contrarian_percentile: number;
    best_call: BestCall;
    worst_miss: WorstMiss;
    avg_entry_price: number;
    timing_profile: 'alpha_hunter' | 'patient_sniper' | 'late_validator';
    timing_example?: string;
    worldview: Worldview;
    worldview_summary?: string;
    personality: string;
    personality_title: string;
    personality_description: string;
    personality_percentile: number;
    volume_percentile: number;
    accuracy_percentile: number;
    win_rate: number;
    crypto_bet: CryptoBet;
    recommended_markets: RecommendedMarket[];
}

// PolyMarket-specific personality archetypes
export const personalityTitles: Record<string, { title: string; description: string; icon: string }> = {
    narrative_trader: {
        title: 'The Narrative Trader',
        description: 'You bet on stories before they become consensus. You see the tweet before the headline.',
        icon: '📱',
    },
    degen_philosopher: {
        title: 'The Degen Philosopher',
        description: 'Deep in politics AND crypto. You see the conspiracy theory... and trade it.',
        icon: '🧠',
    },
    election_trader: {
        title: 'The Election Trader',
        description: 'You live for November. When the polls close, your heart rate spikes.',
        icon: '🗳️',
    },
    whale_whisperer: {
        title: 'The Whale Whisperer',
        description: 'You follow the big wallets. When the whales move, you ride the wave.',
        icon: '🐋',
    },
    black_swan_hunter: {
        title: 'The Black Swan Hunter',
        description: 'You buy the improbable. Most positions expire worthless. But when they hit...',
        icon: '🦢',
    },
    the_oracle: {
        title: 'The Oracle',
        description: 'Your accuracy defies the odds. When you speak, the market should listen.',
        icon: '🔮',
    },
    the_hedge_fund: {
        title: 'The Hedge Fund',
        description: 'Diversified and deliberate. You never put all your USDC in one basket.',
        icon: '💼',
    },
};

export const sampleData: WrappedData = {
    user_id: 'poly_user_2025',
    wallet_address: '0x7a3d...f29e',
    total_usdc_deployed: 47823,
    total_markets: 312,
    percentile: 88,
    days_active: 287,
    longest_streak: 89,
    streak_dates: ['2024-09-01', '2024-11-28'],
    streak_context: 'From Labor Day through Thanksgiving. You lived through the election on Polymarket.',
    top_category: 'Politics',
    category_breakdown: {
        Politics: 0.67,
        Crypto: 0.18,
        Sports: 0.08,
        'Pop Culture': 0.05,
        AI: 0.02,
    },
    category_subtext: "You didn't just vote in November. You traded it.",
    contrarian_score: 0.74,
    contrarian_percentile: 97,
    best_call: {
        market: 'Trump wins 2024',
        entry_price: 0.38,
        settlement_price: 1.0,
        entry_date: '2024-10-12',
        resolution_date: '2024-11-06',
        context: 'By midnight, you knew. The networks caught up by 2am.',
    },
    worst_miss: {
        market: 'Biden drops out',
        exit_price: 0.23,
        settlement_price: 1.0,
        context: 'The Thursday debate. The Sunday letter. You bailed on Friday.',
    },
    avg_entry_price: 0.18,
    timing_profile: 'alpha_hunter',
    timing_example: "You bought 'Solana ETF approved in 2025' at $0.08. It's now at $0.34.",
    worldview: {
        polls_vs_markets: 0.85,
        incumbents_vs_challengers: 0.75,
        stability_vs_chaos: 0.6,
        institutions_vs_outsiders: 0.8,
    },
    worldview_summary: 'A believer in revealed preferences over stated ones.',
    personality: 'narrative_trader',
    personality_title: 'The Narrative Trader',
    personality_description: 'You bet on stories before they become consensus. You see the tweet before the headline.',
    personality_percentile: 4,
    volume_percentile: 88,
    accuracy_percentile: 92,
    win_rate: 71,
    crypto_bet: {
        market: 'Bitcoin above $100K by December 31, 2024',
        entry_price: 0.41,
        settlement_price: 1.0,
        entry_date: '2024-09-15',
        resolution_date: '2024-12-05',
        context: "Bitcoin doesn't care about your timeline. This time, it did.",
    },
    recommended_markets: [
        { title: 'Bitcoin > $100k by Dec 31, 2025?', price: 0.32, volume: '$86M', category: 'Crypto' },
        { title: 'Which party wins US House in 2026?', price: 0.75, volume: '$821k', category: 'Politics' },
        { title: 'US-Venezuela military engagement by Mar 31, 2026?', price: 0.45, volume: '$34M', category: 'Geopolitics' },
    ],
};
