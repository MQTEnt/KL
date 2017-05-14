<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class ActivityFormRequest extends Request
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
        $id = $this->id;
        return [
            'name' => 'required|unique:activities,name,'.$id,
            'content' => 'required|min:10'
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Không được để trống',
            'name.unique' => 'Tên hoạt động đã trùng',
            'content.required' => 'Không được để trống',
            'content.min' => 'Nội dung hoạt động cần ít nhất 10 kí tự'
        ];
    }
}
