open Friends;

type result = {
  duration: float,
  result: string
};

let bench n => {
  let t = Sys.time();
  for x in 1 to n{
    let _ = friends();
  };
  (Sys.time() -. t) *. 1000.0;
};

let multipleValues n: result => {
  let time = bench n;
  let result = friends();
  { duration: time, result: printPerson result.(0) };
};

let rec fib n => n < 2 ? 1 : fib (n - 1) + fib (n - 2);

let format_result n => Printf.sprintf "Result from OCaml is: %d!! \n" n;

module Regex = {
  type t = Re.re;
  let of_string str => Re_perl.compile_pat str;
  let get_match str r =>
    try {
      let groups = Re.exec r str;
      Some (Re.Group.get groups 0)
    } {
    | _ => None
    };
};

let match_string pattern string => {
  let pat = Regex.of_string pattern;
  switch (Regex.get_match string pat) {
  | Some s => s
  | None => "No match"
  }
};

let _ = Callback.register "fib" bench;

let _ = Callback.register "match_string" match_string;

let _ = Callback.register "multiple_return_values" multipleValues;