// ReasonNative.m
#import "ReasonNative.h"
#import <React/RCTLog.h>

@implementation ReasonNative

extern int fib(int n);
extern char * format_result(int n);
extern char * match_string(char * pattern, char * string);
extern void ocaml_init(void);

- (instancetype)init
{
  self = [super init];
  if (self) {
    ocaml_init();
  }
  return self;
}

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(runBenchmark,
                 runBenchmarkWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  double result;
  
  NSDate *methodStart = [NSDate date];
  result = fib(100000);
  NSDate *methodFinish = [NSDate date];
  NSTimeInterval executionTime = [methodFinish timeIntervalSinceDate:methodStart];
  resolve(@"");
}

@end
