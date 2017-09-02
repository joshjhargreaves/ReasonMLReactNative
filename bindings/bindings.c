/* File modwrap.c -- wrappers around the OCaml functions */
#include "bindings.h"
#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include <caml/alloc.h>
#include <caml/memory.h>
#include <caml/mlvalues.h>
#include <caml/callback.h>

double fib(int n)
{
  static value *fib_closure = NULL;
  if (fib_closure == NULL)
    fib_closure = caml_named_value("fib");
  return Double_val(caml_callback(*fib_closure, Val_int(n)));
}

TimingResultStruct multiple_values(int n)
{
  CAMLparam0 ();
  CAMLlocal1(ml_record);
  static value *fib_closure = NULL;
  if (fib_closure == NULL)
    fib_closure = caml_named_value("multiple_return_values");

  ml_record = caml_callback(*fib_closure, Val_int(n));
  double duration = Double_val(Field(ml_record, 0));
  char * friends = String_val(Field(ml_record, 1));

  TimingResultStruct result;
  result.duration = duration;
  result.result = friends;
  CAMLreturnT(TimingResultStruct, result);
}

char *format_result(int n)
{
  CAMLparam0 ();
  CAMLlocal2 (on, ores);
  // avoid redefinition
  static value *format_result_closure = NULL;
  /* The pointer returned by caml_named_value is constant and can safely
    be cached in a C variable to avoid repeated name lookups */
  if (format_result_closure == NULL)
    format_result_closure = caml_named_value("format_result");
  on = Val_int(n);

  ores = caml_callback(*format_result_closure, on);
  CAMLreturnT(char *, String_val(ores));
}

char * match_string(char * pattern, char * string)
{
  CAMLparam0 ();
  CAMLlocal3 (opattern, ostring, ores);
  opattern = caml_copy_string(pattern); 
  ostring = caml_copy_string(string);
  static value * match_closure = NULL;
  if (match_closure == NULL)
    match_closure = caml_named_value("match_string");
  
  ores = caml_callback2(*match_closure, opattern, ostring);

  CAMLreturnT(char *, String_val(ores));
}

void ocaml_init(void)
{
  static bool isInitialised = false;
  if (!isInitialised)
  {
    isInitialised = true;
    char *arg = NULL;
    caml_main(&arg);
  }
}