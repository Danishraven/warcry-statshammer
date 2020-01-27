import Fighter from '../models/fighter';
import * as t from './statsController.types';

export class StatsController {
  compareFighters({ fighters }: t.ICompareFightersParams): t.ICompareFightersResponse {
    const fighterList = fighters.map(f => new Fighter(f.name, f.profile));
    const minStr = Math.min(...fighterList.map(f => f.profile.strength));
    const maxStr = Math.max(...fighterList.map(f => f.profile.strength));
    const toughnessList = this.range(Math.max(minStr - 1, 1), maxStr + 1);
    const data = toughnessList.map(toughness => {
      return fighterList.reduce<t.TMappedResult>(
        (acc, fighter) => {
          acc.results[fighter.name] = fighter.getProbabilities({ toughness });
          return acc;
        },
        { toughness, results: {} },
      );
    });
    return { results: data.map(d => this.buildResult(d)) };
  }

  private range(start: number, end: number) {
    return [...Array(end - start + 1)].map((_, i) => start + i);
  }

  private buildResult(data: t.TMappedResult): t.ICompareFightersResult {
    const figherNames = Object.keys(data.results);
    const mappedProbabilities = this.getMappedProbabilities(data);
    const metrics = this.getMappedMetrics(data);
    const discrete = this.buildDiscreteProbabilities(mappedProbabilities);
    const cumulative = this.buildCumulativeProbabilities(mappedProbabilities, figherNames, metrics);
    return { toughness: data.toughness, discrete, cumulative, metrics };
  }

  private getMappedProbabilities(data: t.TMappedResult): t.TMappedProbabilities {
    return Object.keys(data.results).reduce<t.TMappedProbabilities>((acc, name) => {
      data.results[name].buckets.forEach(({ damage, probability }) => {
        if (acc[damage] == null) acc[damage] = {};
        acc[damage][name] = probability;
      });
      return acc;
    }, {});
  }

  private getMappedMetrics(data: t.TMappedResult): t.TMetrics {
    return Object.keys(data.results).reduce<t.TMetrics>(
      (acc, name) => {
        acc.max[name] = data.results[name].metrics.max;
        return acc;
      },
      { max: {} },
    );
  }

  private buildDiscreteProbabilities(probabilities: t.TMappedProbabilities): t.TProbabilityResult[] {
    return Object.keys(probabilities)
      .map(Number)
      .sort((x, y) => x - y)
      .map(damage => ({ damage, ...probabilities[damage] }));
  }

  private buildCumulativeProbabilities(
    probabilities: t.TMappedProbabilities,
    fighterNames: string[],
    metrics: t.TMetrics,
  ): t.TProbabilityResult[] {
    const maxDamage = Math.max(...Object.keys(probabilities).map(n => Number(n)));
    const sums = fighterNames.reduce((acc, name) => ({ ...acc, [name]: 0 }), {});
    const cumulative = [...Array(maxDamage + 1)].map((_, damage) => {
      const map = probabilities[damage] ?? {};
      return fighterNames.reduce(
        (acc, name) => {
          sums[name] += map[name] ?? 0;
          if (sums[name] >= 100 || damage > metrics.max[name]) {
            sums[name] = 100;
          }
          return { ...acc, [name]: Number(sums[name].toFixed(2)) };
        },
        { damage },
      );
    });
    return [
      ...cumulative,
      fighterNames.reduce((acc, name) => ({ ...acc, [name]: 100 }), { damage: maxDamage + 1 }),
    ];
  }
}

export default StatsController;
