# Gilded Rose Refactoring Kata

This repository is the code base for the Gilded Rose Refactoring Kata. I chose to complete the exercise via TypeScript.

This is not a full application, but to show one possible refactoring solution to this exercise. As such, there is no start script to "run" the application.

## Table of Contents
1. [Pre-requisites](#pre-requisites)
2. [How to get Started](#how-to-get-started)
3. [Code Explanation](#code-explanation)
4. [Considerations](#considerations)

## Pre-Requisites
<a name="pre-requisites"></a>

- TypeScript
- [Unit Testing (chai)](#unit-testing)

## How to get Started
<a name="how-to-get-started"></a>
- Navigate to `TypeScript` directory
- Clone this repository and install all dependencies using `npm install`
- Run `npm run test` to trigger unit tests

## Code Explanation
<a name="code-explanation"></a>
The refactored code is all in `./app`.

My approach is separated into 3 areas of considerations:
1. `GildedRose` class that maintains the existence and execution of `updateQuality` method
2. A utility class called `ItemProcessor`. It has a single static method to build the appropriate item based on `item.name`
3. A collection of "models" classes. There is a `General` model class that acts as a basis for an item. Each of the following 4 models represents a known item:
  - Aged Brie
  - BackstagePass
  - Sulfuras
  - Conjured

Each model extends `General` class to share the same instance variables and methods, especially `processItem`.

Upon iteration of of the list of items in `GildedRose`'s `updateQuality` method, it will determine which model class to build the item, and then execute `processItem`.

The `processItem` calls other methods of the same instance, and these methods can vary per model, as per business requirements stated in [GildedRoseRequirements.txt](./GildedRoseRequirements.txt).

### But how was it refactored?
Good question. At first, I attempted to be a genius coding wizard, emptied the RAM in my brain, and after a quick glance at the instructions, wrote some pseudo code that I *thought* would work. That was a mistake, because the nested conditional hell that I dove myself into was an adventure not for the weak-hearted. Alas, I thought back to real scenarios where I experienced something similar, both mentally and emotionally.

To have an evidence-based refactoring approach, I decided to write unit tests first. Writing unit tests can be tricky because 100% coverage doesn't mean much if it doesn't test the integrity of the app/function.

I left my thought-process via comments in the unit test for [`gilded-rose.spec.ts`](./test/gilded-rose.spec.ts), and these comments should be deleted. It is based on the business requirements as well as cross-referencing the original code. This helped me understand the goals of each known item.

I also added some unit tests for the `General` and `AgedBrie` model class, but technically the `GildedRose` test covers this. It is still there in case an item is removed from the business but we want to keep the model just in case.

Once the test cases were written, it was much easier to refactor the code. I understood what each model class's instance methods needed to do, and what utility function was required to build the appropriate item. After that, it was a matter of iterating the list of items, building the appropriate item, and then processing it.

## Considerations
<a name="considerations"></a>
- Need a unit test for `item-processor.ts`
- Need unit tests for the other models
- The implementation of model class methods could improve. For instance, I try not to overwrite the `processItem` method, but in cases like `Conjure`, I had to do so
- `BackstagePass`'s `updateQualityProcessor` method isn't as consistent, because it forces a complete overhaul of `updateQuality` method to meet the business requirement of setting `quality` to 0 if it is past the sell date
- Global `constants.ts` is probably not the best idea, better to keep it in a more appropriate directory where the `Item` class can also live
