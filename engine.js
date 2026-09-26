/* FenceMath engine - honest fence math. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FenceMath = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  // The post everyone forgets: a run of N sections needs N+1 posts.
  function sections(lengthFt, spacingFt) { return Math.ceil(lengthFt / spacingFt); }
  function posts(lengthFt, spacingFt, gates) {
    return sections(lengthFt, spacingFt) + 1 + (gates || 0); // gate gets its own extra hinge post
  }

  // Hole: 1/3 of the post underground plus a 6 inch gravel base.
  function holeDepthIn(fenceHeightFt) {
    return Math.round((fenceHeightFt / 3 + 0.5) * 12);
  }

  // Concrete per hole: 12 inch diameter cylinder minus the 4x4 post, 50 lb bags (0.375 cu ft each).
  function concreteBagsPerHole(fenceHeightFt) {
    var depthFt = holeDepthIn(fenceHeightFt) / 12;
    var holeCuft = Math.PI * Math.pow(0.5, 2) * depthFt;
    var postCuft = (3.5 / 12) * (3.5 / 12) * depthFt;
    var net = holeCuft - postCuft;
    return Math.max(1, Math.ceil(net / 0.375));
  }

  // Pickets: width + gap across the whole run.
  function pickets(lengthFt, picketWidthIn, gapIn) {
    return Math.ceil(lengthFt * 12 / (picketWidthIn + gapIn));
  }

  // Rails: 2 up to 5 ft, 3 for 6 ft and taller.
  function railsPerSection(fenceHeightFt) { return fenceHeightFt >= 6 ? 3 : 2; }
  function rails(lengthFt, spacingFt, fenceHeightFt) {
    return sections(lengthFt, spacingFt) * railsPerSection(fenceHeightFt);
  }

  var PRICES = { post: 12, picket: 2.5, rail: 6, concrete: 6, gate: 85 };

  function materialCost(lengthFt, spacingFt, fenceHeightFt, picketWidthIn, gapIn, gates, wastePct) {
    var waste = 1 + (wastePct || 0);
    var up = function (x) { return Math.ceil(Math.round(x * 10000) / 10000); }; // 100*1.1 = 110.00000000000001 must not over-buy
    var p = up(posts(lengthFt, spacingFt, gates) * waste);
    var pk = up(pickets(lengthFt, picketWidthIn, gapIn) * waste);
    var r = up(rails(lengthFt, spacingFt, fenceHeightFt) * waste);
    var c = Math.ceil(concreteBagsPerHole(fenceHeightFt) * posts(lengthFt, spacingFt, gates));
    var g = gates || 0;
    return {
      posts: p, pickets: pk, rails: r, concrete: c, gates: g,
      total: Math.round((p * PRICES.post + pk * PRICES.picket + r * PRICES.rail + c * PRICES.concrete + g * PRICES.gate) * 100) / 100
    };
  }

  function verdict(mat) {
    var notes = [];
    notes.push(mat.posts + ' posts (the +1 everyone forgets is included)');
    notes.push(mat.pickets + ' pickets with 10% waste');
    notes.push(mat.concrete + ' bags of concrete');
    notes.push(mat.rails + ' rails');
    return notes;
  }

  return {
    sections: sections,
    posts: posts,
    holeDepthIn: holeDepthIn,
    concreteBagsPerHole: concreteBagsPerHole,
    pickets: pickets,
    railsPerSection: railsPerSection,
    rails: rails,
    PRICES: PRICES,
    materialCost: materialCost,
    verdict: verdict
  };
});
