/**
 * Exercism
 * JavaScript Track
 * Problem 4: RNA Transcription
 * 
 * Solution by Aos
 * 5/26/2017
**/

const DnaTranscriber = function() {
  this.DnaDict = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  }
}

DnaTranscriber.prototype.toRna = function(DnaStrand) {
  let strand = DnaStrand;
  let rna = "";

  // Iterate through strand
  for (let i = 0; i < strand.length; i++) {
    // Check for invalid input
    if (strand[i] !== 'G' &&
        strand[i] !== 'A' &&
        strand[i] !== 'C' &&
        strand[i] !== 'T') {
          throw new Error('Invalid input');
    }

    // For each nucleotide in strand, compare to dictionary
    for (let comp in this.DnaDict) {

      // If equal, build RNA complement
      if (strand[i] === comp) {
        rna += this.DnaDict[comp];
      }
    }
  }

  return rna;
}

module.exports = DnaTranscriber;

/**
 * Alternative solution:
 * 
 * DnaTranscriber.prototype.toRna = function(DnaStrand) {
 *  let strand = DnaStrand;
 *  
 *  if (!strand.match(/^[ACGT]+$)) {
 *    throw new Error('Invalid input');
 *  }
 * 
 *  return strand.split('').map(function(ele) {
 *  this.DnaDict[ele]
 *  }).join('')
 * }
**/