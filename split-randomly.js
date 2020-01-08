"use strict";

module.exports = splitRandomly

function splitRandomly (str_input, chunk_count) {
  let chunks = []
  let str_index = 0
  let cut_actions = 0
  let max_cut_size ;
  let curr_cut_size ;
  let is_double_byte ;
  let cut_end_index ;

  if (chunk_count === undefined) {
    chunk_count = Math.round (Math.random () * str_input.length)
  }

  if (chunk_count < 1) {
    return [str_input]
  }
  else if (chunk_count > str_input.length) {
    chunk_count = str_input.length
  }

  while (chunk_count > cut_actions++) {
    max_cut_size = str_input.length - str_index - chunk_count + cut_actions

    if (chunk_count === cut_actions) {
      curr_cut_size = max_cut_size
    }
    else {
      curr_cut_size = Math.round (Math.random () * max_cut_size)
      if (curr_cut_size > 0) {
        cut_end_index = str_index + curr_cut_size - 1
        if (str_input.charCodeAt (cut_end_index) !==
            str_input.codePointAt (cut_end_index)) {
          curr_cut_size += 1
        }
      }
    }

    chunks.push (str_input.substr (str_index, curr_cut_size))
    str_index += curr_cut_size
  }

  return chunks
}

