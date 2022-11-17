// https://x.nest.land/deno_snowflake@1.0.1/snowflake.ts

/**
 * Twitter Epoch, used as the default epoch. (1288834974657 -> Nov 04 2010 01:42:54)
 */
export const TWITTER_EPOCH = 1288834974657;

/** The sequence to generate a Snowflake ID. Become 0 when the value reach 4096.*/
export let sequence = 0;

/** Represents a deconstructed Snowflake */
export interface MeltedSnowflake {
  /** Timestamp the Snowflake was created */
  timestamp: number;
  /** The ID of the process that generate the Snowflake ID. */
  processID: number;
  /** The ID of the worker that generate the Snowflake ID. */
  workerID: number;
  /** Sequence in the Snowflake */
  sequence: number;
  /** The used Epoch in the Snowflake */
  epoch: number;
  /** Binary representation of the Snowflake ID */
  binary: string;
  /** The Snowflake ID as a string */
  stringID: string;
  /** The Snowflake ID as a BigInt */
  bigIntID: bigint;
  /** The Date the Snowflake was created */
  date: Date;
}

/** Options to generate a Snowflake ID */
export interface SnowflakeIDGeneratorOptions {
  /** The timestamp of the Snowflake ID generation. By default, we recommend `Date.now` */
  timestamp?: number;
  /** The Epoch used for the Snowflake ID generation. By default, we use the Twitter Epoch (`1288834974657`) */
  epoch?: number;
  /** The ID of the process that generate the Snowflake ID. By default this is 0 */
  processID?: number;
  /** The ID of the worker that generate the Snowflake ID. By default this is 1 */
  workerID?: number;
}

/** Deconstructs (melts) a Snowflake ID and returns its information */
export function melt(snowflakeID: string, epoch: number = TWITTER_EPOCH): MeltedSnowflake {
  const binarySnowflakeID = BigInt(snowflakeID).toString(2).padStart(64, '0');

  const snowflakeTimestamp: number = parseInt(binarySnowflakeID.substring(0, 42), 2) + epoch;

  return {
    stringID: snowflakeID,
    bigIntID: BigInt(snowflakeID),
    epoch,
    timestamp: snowflakeTimestamp,
    workerID: parseInt(binarySnowflakeID.substring(42, 47), 2),
    processID: parseInt(binarySnowflakeID.substring(47, 52), 2),
    sequence: parseInt(binarySnowflakeID.substring(52, 64), 2),
    binary: binarySnowflakeID,
    date: new Date(snowflakeTimestamp),
  };
}

/** Generate a Snowflake ID and returns it */
export function generate(
  options: SnowflakeIDGeneratorOptions = {
    timestamp: Date.now(),
    epoch: TWITTER_EPOCH,
    processID: 0,
    workerID: 1,
  },
): string {
  // The sequence should never bypass 4095 since the variable varies
  // from 0 to 4095 (to allow the creation of 2^12 different ID numbers per ms)
  sequence++;
  if (sequence > 4095) sequence = 0;
  const snowflakeID = String(
    ((BigInt(options.timestamp || Date.now()) - BigInt(options.epoch || TWITTER_EPOCH)) << BigInt(22)) +
      BigInt(options.processID || 0) +
      BigInt(options.workerID || 1) +
      BigInt(sequence),
  );

  return snowflakeID;
}
