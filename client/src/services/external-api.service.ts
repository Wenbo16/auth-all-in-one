import axios from "axios";

export const callExternalApi = async (options: any) => {
  try {
    const response = await axios(options.config);
    const { data } = response;

    return {
      data,
      error: null
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;

      const { response } = axiosError;

      let message = "http request failed";

      if (response && response.statusText) {
        message = response.statusText;
      }

      if (axiosError.message) {
        ({ message } = axiosError);
      }

      if (response && response.data && response.data.message) {
        ({ message } = response.data);
      }

      return {
        data: null,
        error: {
          message
        }
      };
    }

    return {
      data: null,
      error: {
        message: (error as Error).message
      }
    };
  }
};
