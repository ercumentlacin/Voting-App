import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "src/lib/supabase";
import type { InsertPoll, InsertVote, Poll, Vote } from "src/types";

interface VotePollSelection {
  vote: Vote;
  poll: Poll;
  selectedOption: string;
  user_id?: string;
}

export const supabaseApi = createApi({
  tagTypes: ["Vote", "Poll"],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getPolls: builder.query<Poll[], void>({
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Poll" as const, id })), "Poll"]
          : ["Poll"],
      queryFn: async () => {
        const { data, error } = await supabase.from("polls").select("*");

        if (error) return { error };
        return { data };
      },
    }),
    getPollById: builder.query<Poll, number>({
      providesTags: (result, error, arg) => [
        result ? { type: "Poll", id: result.id } : "Poll",
      ],
      queryFn: async (id: number) => {
        const { data, error } = await supabase
          .from("polls")
          .select("*")
          .eq("id", id)
          .single();

        if (error) return { error };
        return { data };
      },
    }),
    createPoll: builder.mutation<Poll, InsertPoll>({
      queryFn: async ({ options, question }) => {
        const { data, error } = await supabase
          .from("polls")
          .insert({
            options,
            question,
          })
          .select()
          .single();

        if (error) return { error };
        return { data };
      },
      invalidatesTags: ["Poll"],
    }),
    getVoteById: builder.query<Vote, { pollId: number; userId?: string }>({
      providesTags: (result, error, arg) => [
        result ? { type: "Vote", id: result.id } : "Vote",
      ],
      queryFn: async ({ pollId, userId }) => {
        if (!userId) return { error: "User Id is required" };

        const { data, error } = await supabase
          .from("votes")
          .select("*")
          .eq("poll_id", pollId)
          .eq("user_id", userId)
          .limit(1)
          .single();

        if (error) return { error };
        return { data };
      },
    }),
    upsertVote: builder.mutation<Vote, InsertVote>({
      invalidatesTags: ["Vote"],
      queryFn: async ({ poll_id, option, user_id, id }) => {
        if (!user_id) return { error: "User Id is required" };

        const { data, error } = await supabase
          .from("votes")
          .upsert({
            id: id,
            option: option,
            poll_id,
            user_id,
          })
          .select()
          .single();

        if (error) return { error };
        return { data };
      },
    }),
  }),
});

export const {
  useGetPollsQuery,
  useGetPollByIdQuery,
  useGetVoteByIdQuery,
  useUpsertVoteMutation,
  useCreatePollMutation,
} = supabaseApi;
