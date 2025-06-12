export function successResponse(code: string, message: string, data: any = null) {
  return {
    success: true,
    code,
    message,
    data,
  };
}

export function errorResponse(code: string, message: string, statusCode: number) {
  return {
    success: false,
    code,
    message,
    data: null,
  };
}
