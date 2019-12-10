---
layout: post
title: "Explanation of Capture-Avoiding Substitution"
date: 2019-05-25
category: "Notes"
---

During evaluation of lambda calculus, we often need to perform substitutions of variables or expressions. To evauate the application `(λx.e1) e2` (where `e1` and `e2` are arbitrary expressions) we would need to replace occurrences of `x` inside `e1` with `e2` (notation: `e1 {e2\x}`). Normally substitutions are applied recursively, but since the expressions involved in the substitution might share variable names, the meaning of the resulting expression might change if we are not careful.

For example, suppose we were to evaluate `(λx.λy.x y) y`. If we were to directly substitute `y` for `x` in `λy.x y`, we would get `λy.y y`. This changes the meaning of the expression, because the `y` which we wanted to substitute was originally a free variable; it is not the same `y` that is bound as an argument to the lambda. In our resulting incorrect expression, the `y` we substituted became bound, or captured under the lambda - we want to avoid this by doing something called _capture-avoiding substitution_. 

To perform capture-avoiding substitution on `λv1.e1 {e2\v2}` (where v1 and v2 are arbitrary variables), there are two things we need to check to make sure the variable names do not conflict.

1. We need to make sure that `v1` and `v2` are not the same variable name. If they are, then we need to rename `v1` to something else. This is because performing a simple substitution would also replace variables bound under the abstraction for `v1` withh `e2`, which would be incorrect.

2. We need to make sure that `v1` is not in the free variables of of `e2`. If it is, then we need to rename `v1` to something else. This is because performing a simple substitution would cause occurrences of `v1` inside `e2` to become bound (as in the example earlier).

Once we have made sure there are no conflicts, we can continue applying the substitution recursively (`λv1.(e1 {e2\v2})`). 

To correctly perform substitution for the earlier example, we would rename the `y` in `λy.x y` to something else that does not conflict (like `z`), then perform the substitution. 

`(λx.λy.x y) y` -> `λy.x y {y\x}` -> `λz.x z {y\x}` -> `λz.(x z {y\x})` -> `λz.y z`

To define things more formally, the complete rules for substitution would be as follows:

- `v1 {e\v2}` -> `e` if `v1` == `v2`, otherwise `v1`

- `e1 e2 {e3\v}` -> `(e1 {e3\v}) (e2 {e3\v})`

- `λv1.e1 {e2\v2}` -> `λv1.(e1 {e2\v2})` where `v1` != `v2` and `v1` is not in the free variables of `e2`.