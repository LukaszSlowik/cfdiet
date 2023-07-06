import { CreonZod } from "@/lib/validators/creonSettings";
import { apiSlice } from "../api/apiSlice";

const creonSettingsApiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CreonSettings"],
});
const enhancedCreonSettingsApi = creonSettingsApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getCreonSettings: builder.query({
      query: (sessionId) => "/api/creonsettings",
      providesTags: (result, error, sessionId) => [
        { type: "CreonSettings", sessionId },
      ],
    }),
    updateCreonSettings: builder.mutation<CreonZod, CreonZod>({
      query: (creonSettings) => ({
        url: `/api/creonsettings`,
        method: "PUT",
        body: creonSettings,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["CreonSettings"],
    }),
  }),
});
export const { useGetCreonSettingsQuery, useUpdateCreonSettingsMutation } =
  enhancedCreonSettingsApi;
