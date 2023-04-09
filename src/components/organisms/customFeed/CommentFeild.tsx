import React, { useRef, useState, FormEvent, useEffect } from "react";
import classNames from "classnames";
import { Data as EmojiDataSet } from "emoji-mart";

import {
	Avatar,
	Button,
	DefaultAT,
	DefaultUT,
	Textarea,
	TextareaProps,
	useFeedContext,
	useTranslationContext,
} from "react-activity-feed";
import {
	PropsWithElementAttributes,
	inputValueFromEvent,
} from "react-activity-feed/dist/utils";

export type CommentFieldProps<
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	UT extends DefaultAT = DefaultUT,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	AT extends DefaultAT = DefaultAT
> = PropsWithElementAttributes<
	{
		activity: any;
		/** Override the default emoji dataset, library has a light set of emojis
		 * to show more emojis use your own or emoji-mart sets
		 * https://github.com/missive/emoji-mart#datasets
		 */
		emojiData?: EmojiDataSet;
		image?: string;
		onSuccess?: () => void;
		placeholder?: string;
		targetFeeds?: string[];
		trigger?: TextareaProps["trigger"];
	},
	HTMLFormElement
>;

const CommentField = <
	UT extends DefaultUT = DefaultUT,
	AT extends DefaultAT = DefaultAT
>({
	activity,
	emojiData,
	onSuccess,
	image,
	placeholder,
	trigger,
	targetFeeds,
	className,
	style,
}: CommentFieldProps<UT, AT>) => {
	const feed = useFeedContext<UT, AT>();
	const { t } = useTranslationContext();
	const textareaReference = useRef<HTMLTextAreaElement>();
	const [text, setText] = useState<string>();

	const handleFormSubmit = async (
		event: FormEvent<HTMLFormElement> | KeyboardEvent
	) => {
		event.preventDefault();

		if (!text) return;

		try {
			await feed.onAddReaction("comment", activity, { text }, { targetFeeds });
		} catch (error) {
			console.error(error);
		}

		setText("");
		onSuccess?.();
	};

	useEffect(() => {
		if (!textareaReference.current) return;

		const handleFormSubmitKey = (event: KeyboardEvent) => {
			const { current: textarea } = textareaReference;
			if (event.key === "Enter" && textarea?.nextSibling === null) {
				handleFormSubmit(event);
			}
		};

		textareaReference.current.addEventListener("keydown", handleFormSubmitKey);

		return () =>
			textareaReference.current?.removeEventListener(
				"keydown",
				handleFormSubmitKey
			);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<form
			onSubmit={handleFormSubmit}
			className={classNames("raf-comment-field", className)}
			style={style}
		>
			{image && <Avatar image={image} circle size={39} />}
			<div className="raf-comment-field__group">
				<Textarea
					rows={1}
					value={text}
					placeholder={placeholder ?? t("Comment")}
					onChange={(event: any) =>
						setText(
							(pv) =>
								inputValueFromEvent<HTMLTextAreaElement>(event, true) ?? pv
						)
					}
					emojiData={emojiData}
					trigger={trigger}
					maxLength={280}
					innerRef={(element: any) => (textareaReference.current = element)}
				/>
				<Button buttonStyle="primary" disabled={!text} type="submit">
					{ t("Comment").toString() }
				</Button>
			</div>
		</form>
	);
};

export default CommentField;
