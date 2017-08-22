// ReasonNative.m
#import "ReasonNative.h"
#import <React/RCTLog.h>

@implementation ReasonNative

extern int fib(int n);
extern char * format_result(int n);
extern char * match_string(char * pattern, char * string);
extern void ocaml_init(void);

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(runBenchmark)
{
  int result;
  
  /* Initialize OCaml code */
  ocaml_init();
  /* Do some computation */
  result = fib(23);
  printf("fib(23) = %s\n", format_result(result));
  
  printf("%s", match_string("[lo]+", "hellollo3"));
  
  RCTLogInfo(@"%s, ", match_string("[lo]+", "hellollo3"));
}

@end
