<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class RoomFormRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:10',
            'limit' => 'required|numeric'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Không được để trống',
            'name.max' => 'Tên phòng không vượt quá 10 kí tự',
            'limit.required' => 'Không được để trống',
            'limit.numeric' => 'Mời nhập đúng định dạng số'
        ];
    }
}
